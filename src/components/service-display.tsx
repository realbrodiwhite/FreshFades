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
    { id: "quick-lineup-1", name: "Quick Line Up", price: "$20", section: "Standard Services" },
    { id: "fresh-fade-1", name: "Fresh Fade", price: "$40", section: "Standard Services" },
    { id: "cut-shave-1", name: "Fade & Shave", price: "$75", section: "Standard Services" },
    { id: "shave-1", name: "Shave", price: "$40", section: "Standard Services" },
    { id: "bi-weekly-lineups", name: "Bi-Weekly Lineups", price: "$40/month", section: "Lineup Subscriptions" },
    { id: "weekly-lineups", name: "Weekly Lineups", price: "$75/month", section: "Lineup Subscriptions" },
    { id: "unlimited-lineups", name: "Unlimited Lineups", price: "$145/month", section: "Lineup Subscriptions" },
    { id: "bi-weekly-fade", name: "Bi-Weekly Fade", price: "$65/month", section: "Fade Subscriptions" },
    { id: "weekly-fade", name: "Weekly Fade", price: "$120/month", section: "Fade Subscriptions" },
    { id: "unlimited-fades", name: "Unlimited Fades", price: "$160/month", section: "Fade Subscriptions" },
    { id: "fresh-fade-2", name: "Fresh Fade", price: "$35", section: "Additional Services" },
    { id: "cut-shave-2", name: "Fade & Shave", price: "$30", section: "Additional Services" },
    { id: "fresh-fade-cut-shave", name: "Fresh Fade, Fade & Shave", price: "$60", section: "Additional Services" },
  ];

  const sections = [...new Set(services.map(service => service.section))];

  return (
    <div>
      {sections.map(section => {
        const sectionServices = services.filter(service => service.section === section);
        return (
          <Card key={section}>
            <CardHeader>
              <CardTitle>{section}</CardTitle>
              <CardDescription>Explore our {section.toLowerCase()}.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-none pl-0 grid gap-2">
                {sectionServices.map((service) => (
                  <li key={service.id} className="flex justify-between py-2 rounded-md shadow-sm p-4 bg-secondary">
                    <span>{service.name}</span>
                    <span className="font-semibold">{service.price}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
