"use client";

import { Toaster } from "@/components/ui/toaster";
import { AppointmentBooking } from "@/components/appointment-booking";
import { ServiceDisplay } from "@/components/service-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background antialiased container py-12">
      <Toaster />
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">
            Fresh Fades Cut & Shave
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <ServiceDisplay />
          <Separator />
          <AppointmentBooking />
        </CardContent>
      </Card>
    </div>
  );
}
