
"use client"; // Required for onAuthStateChanged and admin-specific content

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth, db } from '@/lib/firebase'; // Import db
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { Icons } from '@/components/icons';
// Import AppointmentBooking and other necessary components when ready for Phase 2
// import { AppointmentBooking } from "@/components/appointment-booking";
// import { bookableServices } from "@/app/page"; // Or fetch dynamically

export default function AdminDashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check for admin role
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists() && userDocSnap.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          // Optionally redirect if not admin
          // router.push('/'); 
        }
      } else {
        setUser(null);
        setIsAdmin(false);
        // Optionally redirect to login
        // router.push('/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-background antialiased items-center justify-center p-4">
        <Icons.spinner className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex flex-col min-h-screen bg-background antialiased items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto text-center">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You do not have permission to view this page. Please log in as an administrator.</p>
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
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Admin Dashboard</CardTitle>
          <CardDescription className="text-center">Manage appointments, services, and clients.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Placeholder for Pending Appointment Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Appointment Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Appointment requests from guest users will be listed here for approval or rejection.
              </p>
            </CardContent>
          </Card>

          {/* Placeholder for All Appointments List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">All Confirmed Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A list of all confirmed appointments will be displayed here for management.
              </p>
            </CardContent>
          </Card>
          
          {/* Placeholder for Admin Booking Form - if needed */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Book for a Client (Admin)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                An admin-specific booking form might be integrated here.
              </p>
              {/* 
                When ready for Phase 2:
                <AppointmentBooking bookableServices={bookableServices} isAdminBooking={true} /> 
              */}
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
