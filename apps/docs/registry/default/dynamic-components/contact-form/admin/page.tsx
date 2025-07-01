import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/registry/default/ui/card";
import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";
import {
  getTotalMessageCount,
  getUnreadMessageCounts,
} from "@/registry/default/dynamic-components/contact-form/actions/contact-actions";

export default async function AdminDashboard() {
  const { unreadCount } = await getUnreadMessageCounts();
  const { totalMessages } = await getTotalMessageCount();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Unread Messages
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unreadCount}</div>
            <p className="text-xs text-muted-foreground">
              Out of {totalMessages} total messages
            </p>
            <div className="mt-4">
              <Link
                href="/admin/messages"
                className="text-sm text-primary flex items-center"
              >
                View all messages
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
