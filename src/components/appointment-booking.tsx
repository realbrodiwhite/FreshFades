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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [service, setService] = useState<string>("Fresh Fade");

  const handleBooking = () => {
    if (!date || !name || !email) {
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
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>Choose your date and service.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
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
        <Button onClick={handleBooking}>Book Now</Button>
      </CardContent>
    </Card>
  );
}
