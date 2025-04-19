"use client";

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
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export function AppointmentBooking() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [service, setService] = useState<string>("Fresh Fade");

  const handleBooking = () => {
    if (!date || !firstName || !lastName || !email || !phoneNumber) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking process
    toast({
      title: "Success",
      description: `Appointment booked for ${
        date.toLocaleDateString()
      } for ${service}.`,
    });
  };

  return (
    <Card>
      <CardHeader className="place-items-center">
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
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="grid gap-2 place-items-center">
          <Label>Preferred Date</Label>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="service">Select Service</Label>
          <select
            id="service"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="Fresh Fade">Fresh Fade</option>
            <option value="Cut & Shave">Cut & Shave</option>
            <option value="Shave">Shave</option>
            <option value="Weekly Lineup">Weekly Lineup</option>
          </select>
        </div>
        <Button className="w-full" onClick={handleBooking}>Book Now</Button>
      </CardContent>
    </Card>
  );
}
