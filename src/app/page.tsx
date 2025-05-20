
"use client";

import type { Service } from "@/lib/types";
import { Toaster } from "@/components/ui/toaster";
import { AppointmentBooking } from "@/components/appointment-booking";
import { ServiceDisplay } from "@/components/service-display";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MapPin, Phone, Scissors, Truck, CalendarDays, Users, Clock } from "lucide-react";
import Image from "next/image";

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
      <header className="sticky top-0 z-50 py-4 bg-card shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="h-8 w-8 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary">
              Fresh Fades
            </h1>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/login" passHref>
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/70 to-primary">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('https://placehold.co/1920x1080.png')" }}
            data-ai-hint="barber tools"
          ></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6 drop-shadow-md">
              Your Style, Your Place.
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto drop-shadow-sm">
              Experience premium barber services, whether you need us to come to you or you visit us at Ricky's Place in Monte Vista.
            </p>
            <Link href="#book-appointment" passHref>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Book Your Cut Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="Barber at work" 
                  width={600} 
                  height={400} 
                  className="rounded-lg shadow-xl"
                  data-ai-hint="barber working" 
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">About Fresh Fades</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fresh Fades Cut & Shave is more than just a barbershop; it's a commitment to quality, convenience, and style. 
                  Founded by Ricky, a passionate barber with years of experience, we offer top-notch grooming services tailored to your needs.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We understand life gets busy. That's why we bring the barbershop experience to your doorstep with our <span className="font-semibold text-primary">Mobile Barber Service</span>. 
                  Prefer a traditional setting? Visit us at <span className="font-semibold text-primary">Ricky's Place</span>, our comfortable and private home-based shop in Monte Vista, Colorado. All services at Ricky's Place are by appointment only.
                </p>
                 <div className="flex space-x-4 pt-4">
                  <Link href="#services">
                    <Button variant="outline">Our Services</Button>
                  </Link>
                  <Link href="#contact">
                    <Button>Contact Us</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="why-us" className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose Fresh Fades?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-2">
                    <Truck className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Mobile Convenience</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  We bring the full barbershop experience to your home, office, or event. Save time and enjoy a fresh cut wherever you are.
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-2">
                    <MapPin className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Ricky's Place (Monte Vista)</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  Visit our comfortable and private in-home shop in Monte Vista, CO, for a dedicated and personalized grooming session. By appointment only.
                </CardContent>
              </Card>
              <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-2">
                    <Scissors className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle>Expert Barbering</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground">
                  With years of experience, Ricky delivers precision cuts, sharp fades, and classic shaves, tailored to your individual style.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        <Separator />

        {/* Services Section */}
        <section id="services" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <Card className="w-full shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Our Services</CardTitle>
                <CardDescription>Quality grooming, whether we come to you or you visit us.</CardDescription>
              </CardHeader>
              <CardContent>
                <ServiceDisplay services={allServices} />
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator />

        {/* How Mobile Service Works Section */}
        <section id="mobile-service" className="py-16 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Mobile Barber Service</h2>
            <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
              Getting a professional haircut has never been easier. Here's how our mobile service works:
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
                <CalendarDays className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">1. Book Online</h3>
                <p className="text-muted-foreground text-center">Select your desired service, preferred date, and time through our easy online booking system.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
                <Truck className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">2. We Come To You</h3>
                <p className="text-muted-foreground text-center">Ricky arrives at your specified location (home, office, etc.) fully equipped with all necessary tools.</p>
              </div>
              <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-md">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">3. Enjoy Your Cut</h3>
                <p className="text-muted-foreground text-center">Relax and get a top-quality haircut or shave in the comfort of your own space. No travel, no waiting rooms.</p>
              </div>
            </div>
          </div>
        </section>
        
        <Separator />

        {/* Ricky's Place Section */}
        <section id="rickys-place" className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-foreground">Visit Us at Ricky's Place</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For those who prefer a dedicated barbershop environment, Ricky's Place offers a welcoming and professional setting at our <span className="font-semibold text-primary">in-home barbershop in Monte Vista, Colorado</span>.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Enjoy a focused grooming experience in a comfortable and private atmosphere. All services at Ricky's Place are <span className="font-semibold text-primary">strictly by appointment only</span>. Please book in advance to secure your spot.
                </p>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2 text-primary" />
                  <span>Monte Vista, Colorado (Full address provided upon successful booking)</span>
                </div>
                 <div className="flex items-center text-muted-foreground">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span>By Appointment Only</span>
                </div>
                 <Link href="#book-appointment">
                    <Button variant="default" className="mt-4">Book at Ricky's Place</Button>
                  </Link>
              </div>
               <div>
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="Ricky's Place interior" 
                  width={600} 
                  height={400} 
                  className="rounded-lg shadow-xl"
                  data-ai-hint="barbershop interior"
                />
              </div>
            </div>
          </div>
        </section>

        <Separator />

        {/* Book Appointment Section */}
        <section id="book-appointment" className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <Card className="w-full max-w-2xl mx-auto shadow-xl">
              <AppointmentBooking bookableServices={bookableServices} />
            </Card>
          </div>
        </section>

        <Separator />
        
        {/* Navigation to Dashboards - Can be removed or kept based on preference */}
        <section id="navigation-dashboards" className="py-12 bg-background">
          <div className="container mx-auto px-4">
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
          </div>
        </section>
      </main>
      <Toaster />
      <footer id="contact" className="py-12 text-center text-muted-foreground bg-card border-t mt-auto">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold text-foreground mb-4">Get In Touch</h3>
          <p className="mb-2">Have questions or need to discuss a special request?</p>
          <div className="flex justify-center items-center space-x-4 mb-4">
            <Phone className="h-5 w-5 text-primary" />
            <a href="tel:+15551234567" className="hover:text-primary">(555) 123-4567</a>
            <Icons.mail className="h-5 w-5 text-primary" />
            <a href="mailto:ricky@freshfades.com" className="hover:text-primary">ricky@freshfades.com</a>
          </div>
          <p className="text-sm">
            Servicing Monte Vista, CO and surrounding areas for mobile appointments. <br/>
            Ricky's Place (in-home barbershop) located in Monte Vista, CO (address upon booking, by appointment only).
          </p>
          <Separator className="my-6 max-w-xs mx-auto" />
          <p>&copy; {new Date().getFullYear()} Fresh Fades Cut & Shave. All rights reserved.</p>
          <p className="text-xs mt-2">
            Website by Firebase Studio AI
          </p>
        </div>
      </footer>
    </div>
  );
}

// Helper icon for hero button
const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
    <path d="M12.175 7.325L8.575 3.725L9.275 3L13.55 7.275L14 7.725L13.55 8.175L9.275 12.45L8.575 11.725L12.175 8.125H2V7.325H12.175Z" />
  </svg>
);
