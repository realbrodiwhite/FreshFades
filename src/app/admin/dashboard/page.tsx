
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background antialiased container py-12">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p>Welcome to the admin dashboard. Manage appointments, services, and clients from here.</p>
          {/* Placeholder for future admin dashboard features */}
          <div className="mt-6">
            <Link href="/" passHref>
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
