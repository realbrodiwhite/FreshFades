
"use client"; // Required for onAuthStateChanged and user-specific content

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { Icons } from '@/components/icons';
// Import AppointmentBooking and other necessary components when ready for Phase 2
// import { AppointmentBooking } from "@/components/appointment-booking";
// import { bookableServices } from "@/app/page"; // Or fetch dynamically

export default function ClientDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        // Optionally redirect to login if not authenticated
        // router.push('/login'); 
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background antialiased items-center justify-center p-4">
        <Icons.spinner className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen bg-background antialiased items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Please log in to view your dashboard.</p>
            <Link href="/login" passHref>
              <Button>Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background antialiased container py-12">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Client Dashboard</CardTitle>
          <CardDescription className="text-center">Welcome back, {user.email}!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p>Here you will be able to manage your appointments and profile.</p>
          </div>
          
          {/* Placeholder for Appointment Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Book a New Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The self-service booking form will be integrated here soon.
                For now, you can book new appointments from the <Link href="/#book-appointment" className="underline hover:text-primary">homepage</Link>.
              </p>
              {/* 
                When ready for Phase 2:
                <AppointmentBooking bookableServices={bookableServices} /> 
              */}
            </CardContent>
          </Card>

          {/* Placeholder for Upcoming Appointments List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A list of your upcoming and past appointments will be displayed here, allowing you to manage them.
              </p>
              <div className="bg-muted p-4 rounded-md mt-4">
                <p className="text-sm text-muted-foreground">
                  Appointment management features (view, cancel, reschedule) are coming soon!
                </p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center">
            <Link href="/" passHref>
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
