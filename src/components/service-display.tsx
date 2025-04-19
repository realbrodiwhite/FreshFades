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
    { id: "fresh-fade-1", name: "Fresh Fade", price: "$40", section: "Standard Services" },
    { id: "cut-shave-1", name: "Cut & Shave", price: "$75", section: "Standard Services" },
    { id: "shave-1", name: "Shave", price: "$40", section: "Standard Services" },
    { id: "weekly-lineup-1", name: "Weekly Lineup", price: "$25", section: "Standard Services" },
    { id: "bi-weekly-lineups", name: "Bi-Weekly Lineups (Subscription)", price: "$40/month", section: "Subscription Services" },
    { id: "weekly-lineups", name: "Weekly Lineups (Subscription)", price: "$75/month", section: "Subscription Services" },
    { id: "unlimited-lineups", name: "Unlimited Lineups (Subscription)", price: "$145/month", section: "Subscription Services" },
    { id: "bi-weekly-fade", name: "Bi-Weekly Fade (Subscription)", price: "$65/month", section: "Subscription Services" },
    { id: "weekly-fade", name: "Weekly Fade (Subscription)", price: "$120/month", section: "Subscription Services" },
    { id: "unlimited-fades", name: "Unlimited Fades (Subscription)", price: "$160/month", section: "Subscription Services" },
    { id: "fresh-fade-2", name: "Fresh Fade", price: "$35", section: "Additional Services" },
    { id: "cut-shave-2", name: "Cut & Shave", price: "$30", section: "Additional Services" },
    { id: "fresh-fade-cut-shave", name: "Fresh Fade, Cut & Shave", price: "$60", section: "Additional Services" },
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
