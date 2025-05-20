
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
import { Label } from "@/components/ui/label"; // Keep for non-form labels if any, but FormLabel is preferred
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

export function AppointmentBooking({ bookableServices }: AppointmentBookingProps) {
  const form = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      date: new Date(),
      selectedServiceId: bookableServices.length > 0 ? bookableServices[0].id : undefined,
    },
  });

  useEffect(() => {
    // Update default service ID if bookableServices changes and no service is selected
    // or if the selected one is no longer available (though schema requires selection)
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

  return (
    <Card className="shadow-md">
      <CardHeader className="place-items-center text-center">
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>Choose your date and service.</CardDescription>
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
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="rounded-md border"
                      disabled={(day) => day < new Date(new Date().setHours(0,0,0,0)) } // Disable past dates
                    />
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
