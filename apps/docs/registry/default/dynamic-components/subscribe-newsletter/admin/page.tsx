import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { getAllSubscribers } from "@/registry/default/dynamic-components/subscribe-newsletter/actions/subscribe-newsletter-actions";

export default async function AdminDashboard() {
  const subscribers = await getAllSubscribers();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              NewsLetter Management
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscribers.length}</div>
            <p className="text-xs text-muted-foreground">Subscribers</p>
            <div className="mt-4">
              <Link
                href="/admin/newsletter"
                className="text-sm text-primary flex items-center"
              >
                View all
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
