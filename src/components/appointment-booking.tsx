
"use client";

import type { Service } from "@/lib/types";
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

interface AppointmentBookingProps {
  bookableServices: Service[];
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
});

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>;

// Placeholder for Calendar to be shown during SSR and initial client render
const CalendarPlaceholder = () => (
  <div className="rounded-md border p-3 h-[320px] w-[300px] flex flex-col items-center justify-center bg-muted/20">
    <Icons.loader className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
    <p className="text-sm text-muted-foreground">Loading Calendar...</p>
  </div>
);


export function AppointmentBooking({ bookableServices }: AppointmentBookingProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      date: new Date(), // Default to current date
      selectedServiceId: bookableServices.length > 0 ? bookableServices[0].id : undefined,
    },
  });

  useEffect(() => {
    // Update default service ID if bookableServices changes
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


  const onSubmit = (data: AppointmentFormValues) => {
    const serviceName = bookableServices.find(s => s.id === data.selectedServiceId)?.name || "Selected Service";

    toast({
      title: "Booking Submitted (Mock)",
      description: `Appointment for ${data.firstName} ${data.lastName} on ${data.date.toLocaleDateString()} for ${serviceName}. Contact: ${data.email}, ${data.phoneNumber}`,
    });
    console.log("Form data:", data);
    // Here you would typically call an API to save the appointment
    // form.reset(); // Optionally reset form after submission
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Start of today

  const twelveMonthsFromNow = new Date();
  twelveMonthsFromNow.setMonth(twelveMonthsFromNow.getMonth() + 12);
  twelveMonthsFromNow.setHours(23, 59, 59, 999); // End of the day, 12 months from now

  return (
    <Card className="shadow-md">
      <CardHeader className="place-items-center text-center">
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>Choose your date and service. You can book up to 12 months in advance.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
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
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
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
                    <Input type="tel" placeholder="Enter phone number" {...field} />
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
                        disabled={(day) => day < today || day > twelveMonthsFromNow } // Disable past dates and dates > 12 months
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
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
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
            <Button type="submit" className="w-full" disabled={bookableServices.length === 0 || form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Booking..." : "Book Now"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
