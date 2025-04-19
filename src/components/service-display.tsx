"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ServiceDisplay() {
  const services = [
    { id: "fresh-fade-1", name: "Fresh Fade", price: "$40" },
    { id: "cut-shave-1", name: "Cut & Shave", price: "$75" },
    { id: "shave-1", name: "Shave", price: "$40" },
    { id: "weekly-lineup-1", name: "Weekly Lineup", price: "$25" },
    { id: "bi-weekly-lineups", name: "Bi-Weekly Lineups (Subscription)", price: "$40/month" },
    { id: "weekly-lineups", name: "Weekly Lineups (Subscription)", price: "$75/month" },
    { id: "unlimited-lineups", name: "Unlimited Lineups (Subscription)", price: "$145/month" },
    { id: "bi-weekly-fade", name: "Bi-Weekly Fade (Subscription)", price: "$65/month" },
    { id: "weekly-fade", name: "Weekly Fade (Subscription)", price: "$120/month" },
    { id: "unlimited-fades", name: "Unlimited Fades (Subscription)", price: "$160/month" },
    { id: "fresh-fade-2", name: "Fresh Fade", price: "$35" },
    { id: "cut-shave-2", name: "Cut & Shave", price: "$30" },
    { id: "fresh-fade-cut-shave", name: "Fresh Fade, Cut & Shave", price: "$60" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Our Services</CardTitle>
        <CardDescription>Explore our offerings.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ul className="list-none pl-0">
          {services.map((service) => (
            <li key={service.id} className="flex justify-between py-2">
              <span>{service.name}</span>
              <span className="font-semibold">{service.price}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
