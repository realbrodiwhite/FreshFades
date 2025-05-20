
"use client";

import type { Service } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ServiceDisplayProps {
  services: Service[];
}

export function ServiceDisplay({ services }: ServiceDisplayProps) {
  const sections = [...new Set(services.map(service => service.section))];

  return (
    <div>
      {sections.map(section => {
        const sectionServices = services.filter(service => service.section === section);
        if (sectionServices.length === 0) return null;

        return (
          <Card key={section} className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle>{section}</CardTitle>
              <CardDescription>Explore our {section.toLowerCase()}.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-none pl-0 grid gap-3">
                {sectionServices.map((service) => (
                  <li key={service.id} className="flex justify-between items-center py-3 px-4 rounded-md shadow-sm bg-secondary">
                    <div>
                      <span className="font-medium">{service.name}</span>
                      {service.description && <p className="text-sm text-muted-foreground">{service.description}</p>}
                    </div>
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
