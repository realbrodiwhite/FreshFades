import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ServiceDisplay() {
  const services = [
    { name: "Fresh Fade", price: "$40" },
    { name: "Cut & Shave", price: "$75" },
    { name: "Shave", price: "$40" },
    { name: "Weekly Lineup", price: "$25" },
    { name: "Bi-Weekly Lineups (Subscription)", price: "$40/month" },
    { name: "Weekly Lineups (Subscription)", price: "$75/month" },
    { name: "Unlimited Lineups (Subscription)", price: "$145/month" },
    { name: "Bi-Weekly Fade (Subscription)", price: "$65/month" },
    { name: "Weekly Fade (Subscription)", price: "$120/month" },
    { name: "Unlimited Fades (Subscription)", price: "$160/month" },
    { name: "Fresh Fade", price: "$35" },
    { name: "Cut & Shave", price: "$30" },
    { name: "Fresh Fade, Cut & Shave", price: "$60" },
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
            <li key={service.name} className="flex justify-between py-2">
              <span>{service.name}</span>
              <span className="font-semibold">{service.price}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
