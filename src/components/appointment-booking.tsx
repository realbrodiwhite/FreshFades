
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
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AppointmentBookingProps {
  bookableServices: Service[];
}

export function AppointmentBooking({ bookableServices }: AppointmentBookingProps) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedServiceId, setSelectedServiceId] = useState<string>(bookableServices.length > 0 ? bookableServices[0].id : "");

  useEffect(() => {
    // Ensure selectedServiceId is valid if bookableServices changes or on initial load
    if (bookableServices.length > 0 && !bookableServices.find(s => s.id === selectedServiceId)) {
      setSelectedServiceId(bookableServices[0].id);
    }
  }, [bookableServices, selectedServiceId]);


  const handleBooking = () => {
    if (!date || !firstName || !lastName || !email || !phoneNumber || !selectedServiceId) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select a service.",
        variant: "destructive",
      });
      return;
    }

    const serviceName = bookableServices.find(s => s.id === selectedServiceId)?.name || "Selected Service";

    // Simulate booking process
    toast({
      title: "Success",
      description: `Appointment booked for ${date.toLocaleDateString()} for ${serviceName}.`,
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="place-items-center text-center">
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>Choose your date and service.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        <div className="grid gap-2 place-items-center">
          <Label>Preferred Date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            disabled={(day) => day < new Date(new Date().setHours(0,0,0,0)) } // Disable past dates
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="service">Select Service</Label>
          <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
            <SelectTrigger id="service">
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {bookableServices.map(service => (
                <SelectItem key={service.id} value={service.id}>
                  {service.name} ({service.price})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full" onClick={handleBooking} disabled={bookableServices.length === 0}>Book Now</Button>
      </CardContent>
    </Card>
  );
}
