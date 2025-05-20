
"use client";

import type { Service, Appointment } from "@/lib/types";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/icons";
import { auth, db } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";

interface AppointmentBookingProps {
  bookableServices: Service[];
  // We might add a prop here later if booking is initiated from a dashboard for a specific user
}

const appointmentFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }).max(15, {message: "Phone number is too long."}),
  date: z.date({
    required_error: "A date is required.",
    invalid_type_error: "Invalid date format.",
  }),
  selectedServiceId: z.string({ required_error: "Please select a service." }).min(1, {message: "Please select a service."}),
  notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

const CalendarPlaceholder = () => (
  <div className="rounded-md border p-3 h-[320px] w-[300px] flex flex-col items-center justify-center bg-muted/20">
    <Icons.loader className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
    <p className="text-sm text-muted-foreground">Loading Calendar...</p>
  </div>
);


export function AppointmentBooking({ bookableServices }: AppointmentBookingProps) {
  const [isClient, setIsClient] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      date: new Date(), 
      selectedServiceId: bookableServices.length > 0 ? bookableServices[0].id : undefined,
      notes: "",
    },
  });

  useEffect(() => {
    if (currentUser) {
      // Pre-fill email if user is logged in, can be expanded to other fields later
      form.setValue("email", currentUser.email || "");
      // Could pre-fill name if we store it in their auth profile or Firestore user doc
    }
  }, [currentUser, form]);

  useEffect(() => {
    if (bookableServices.length > 0) {
        const currentServiceId = form.getValues("selectedServiceId");
        const isValidService = bookableServices.some(s => s.id === currentServiceId);
        if (!currentServiceId || !isValidService) {
            form.setValue("selectedServiceId", bookableServices[0].id);
        }
    } else {
        form.setValue("selectedServiceId", undefined);
    }
  }, [bookableServices, form]);


  const onSubmit = async (data: AppointmentFormValues) => {
    setIsSubmitting(true);
    const selectedService = bookableServices.find(s => s.id === data.selectedServiceId);
    if (!selectedService) {
      toast({ title: "Error", description: "Selected service not found.", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    const appointmentData: Omit<Appointment, "id" | "createdAt" | "updatedAt"> & { createdAt: any } = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      date: Timestamp.fromDate(data.date),
      selectedServiceId: data.selectedServiceId,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      status: currentUser ? 'confirmed' : 'pending_approval',
      notes: data.notes || "",
      createdAt: serverTimestamp(), // Firestore server-side timestamp
    };

    if (currentUser) {
      appointmentData.userId = currentUser.uid;
    }

    try {
      const docRef = await addDoc(collection(db, "appointments"), appointmentData);
      toast({
        title: currentUser ? "Appointment Confirmed!" : "Appointment Request Submitted!",
        description: currentUser 
          ? `Your appointment for ${selectedService.name} on ${data.date.toLocaleDateString()} is confirmed. We'll contact you if there are any issues.`
          : `Your request for ${selectedService.name} on ${data.date.toLocaleDateString()} has been sent for approval. We'll contact you soon!`,
      });
      console.log("Appointment document written with ID: ", docRef.id);
      form.reset({ 
        ...form.getValues(), // keep some values if needed or reset completely
        date: new Date(), // Reset date to today
        notes: "",
        // Consider not resetting name/email/phone if it's a guest to allow multiple requests easily
      }); 
    } catch (error) {
      console.error("Error adding appointment: ", error);
      toast({
        title: "Booking Failed",
        description: "Could not save your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const twelveMonthsFromNow = new Date();
  twelveMonthsFromNow.setMonth(twelveMonthsFromNow.getMonth() + 12);
  twelveMonthsFromNow.setHours(23, 59, 59, 999); 

  return (
    <Card className="shadow-md">
      <CardHeader className="place-items-center text-center">
        <CardTitle>
          {currentUser ? "Book Your Appointment" : "Request an Appointment"}
        </CardTitle>
        <CardDescription>
          {currentUser 
            ? "Choose your date and service. You can book up to 12 months in advance." 
            : "Fill out the form to request an appointment. We'll confirm via email/phone. Create an account to manage your bookings!"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name" {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} disabled={isSubmitting || !!(currentUser && currentUser.email)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter phone number" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="grid gap-2 place-items-center">
                  <FormLabel>Preferred Date</FormLabel>
                  <FormControl>
                    {isClient ? (
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="rounded-md border"
                        disabled={(day) => day < today || day > twelveMonthsFromNow || isSubmitting } 
                      />
                    ) : (
                      <CalendarPlaceholder />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="selectedServiceId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Service</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value} disabled={isSubmitting}>
                    <FormControl>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bookableServices.map(service => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} ({service.price})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Any specific requests or details?" {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={bookableServices.length === 0 || isSubmitting}>
              {isSubmitting ? 
                <><Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : 
                (currentUser ? "Confirm Booking" : "Request Appointment")}
            </Button>
            {!currentUser && (
              <p className="text-sm text-center text-muted-foreground mt-2">
                <a href="/signup" className="underline hover:text-primary">Sign up</a> or <a href="/login" className="underline hover:text-primary">Login</a> to manage your appointments easily.
              </p>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
