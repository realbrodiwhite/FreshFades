
"use client";

import type { Service } from "@/lib/types";
import { Toaster } from "@/components/ui/toaster";
import { AppointmentBooking } from "@/components/appointment-booking";
import { ServiceDisplay } from "@/components/service-display";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const allServices: Service[] = [
  { id: "quick-lineup", name: "Quick Line Up", price: "$20", section: "Standard Services", description: "Touching up lines and quickly cleaning it up." },
  { id: "hot-shave", name: "Hot Shave", price: "$30", section: "Standard Services", description: "Traditional hot towel shave." },
  { id: "fresh-fade", name: "Fresh Fade", price: "$35", section: "Standard Services", description: "Precision fade haircut." },
  { id: "cut-shave", name: "Fade & Shave", price: "$60", section: "Standard Services", description: "Combined fade haircut and hot shave." },
  
  { id: "2-lineups-monthly", name: "2 Lineups Monthly", price: "$40/month", section: "Lineup Subscriptions", description: "Two lineup services per month." },
  { id: "weekly-lineups", name: "Weekly Lineups", price: "$75/month", section: "Lineup Subscriptions", description: "A lineup service every week." },
  { id: "unlimited-lineups", name: "Unlimited Lineups", price: "$145/month", section: "Lineup Subscriptions", description: "Unlimited lineup services." },
  
  { id: "bi-weekly-fade", name: "Bi-Weekly Fade", price: "$65/month", section: "Fade Subscriptions", description: "A fade haircut every two weeks." },
  { id: "weekly-fade", name: "Weekly Fade", price: "$120/month", section: "Fade Subscriptions", description: "A fade haircut every week." },
  { id: "unlimited-fades", name: "Unlimited Fades", price: "$160/month", section: "Fade Subscriptions", description: "Unlimited fade haircuts." },
  
  { id: "fresh-fade-premium", name: "Fresh Fade (Premium)", price: "$45", section: "Additional Services", description: "Premium fade service with enhancements." },
  { id: "cut-shave-deluxe", name: "Fade & Shave (Deluxe)", price: "$70", section: "Additional Services", description: "Deluxe fade and shave combo." },
  { id: "beard-trim-shape", name: "Beard Trim & Shape-Up", price: "$25", section: "Additional Services", description: "Detailed beard trimming and shaping." },
];

const bookableServices: Service[] = allServices.filter(
  service => service.section === "Standard Services" || service.section === "Additional Services"
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background antialiased">
      <header className="py-6 bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary">
              Fresh Fades Cut & Shave
            </h1>
            <p className="text-muted-foreground">Book your appointment now!</p>
          </div>
          <Link href="/login" passHref>
            <Button>Login / Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4 space-y-12">
        <section id="services">
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center">Our Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ServiceDisplay services={allServices} />
            </CardContent>
          </Card>
        </section>

        <Separator />

        <section id="book-appointment">
          <Card className="w-full max-w-2xl mx-auto shadow-lg">
            <AppointmentBooking bookableServices={bookableServices} />
          </Card>
        </section>

        <Separator />
        
        <section id="navigation-dashboards">
          <Card className="w-full max-w-2xl mx-auto shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">Manage Your Experience</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/client/dashboard" passHref>
                <Button variant="outline" className="w-full sm:w-auto">Client Dashboard</Button>
              </Link>
              <Link href="/admin/dashboard" passHref>
                <Button variant="outline" className="w-full sm:w-auto">Admin Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </section>
      </main>
      <Toaster />
      <footer className="py-6 text-center text-muted-foreground bg-card border-t mt-auto">
        <p>&copy; {new Date().getFullYear()} Fresh Fades Cut & Shave. All rights reserved.</p>
      </footer>
    </div>
  );
}
