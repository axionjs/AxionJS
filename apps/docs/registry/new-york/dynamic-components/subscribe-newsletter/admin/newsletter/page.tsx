import { SubscriberList } from "@/registry/new-york/dynamic-components/subscribe-newsletter/components/subscriber-list";
import { NewsletterCampaignForm } from "@/registry/new-york/dynamic-components/subscribe-newsletter/components/newsletter-campaign-form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getAllCampaigns,
  getAllSubscribers,
} from "@/registry/new-york/dynamic-components/subscribe-newsletter/actions/subscribe-newsletter-actions";

export default async function AdminNewsletterPage() {
  const subscribers = await getAllSubscribers();
  const campaigns = await getAllCampaigns();

  const activeSubscribersCount = subscribers.filter(
    (sub) => sub.status === "ACTIVE"
  ).length;

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Newsletter Management</h1>

      <div className="grid gap-6 mb-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribers.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeSubscribersCount} active subscribers
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{campaigns.length}</div>
              <p className="text-xs text-muted-foreground">
                {campaigns.length > 0
                  ? `Last sent ${new Date(
                      campaigns[0].createdAt
                    ).toLocaleDateString()}`
                  : "No campaigns sent yet"}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="subscribers">
        <TabsList className="mb-6">
          <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          <TabsTrigger value="send-newsletter">Send Newsletter</TabsTrigger>
          <TabsTrigger value="campaigns">Past Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers">
          <SubscriberList initialSubscribers={subscribers} />
        </TabsContent>

        <TabsContent value="send-newsletter">
          <Card>
            <CardHeader>
              <CardTitle>Send Newsletter</CardTitle>
              <CardDescription>
                Compose and send a newsletter to all active subscribers (
                {activeSubscribersCount})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NewsletterCampaignForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Recent Campaigns</h2>

            {campaigns.length === 0 ? (
              <p className="text-muted-foreground">
                No campaigns have been sent yet.
              </p>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {campaign.subject}
                      </CardTitle>
                      <CardDescription>
                        Sent on{" "}
                        {new Date(campaign.createdAt).toLocaleDateString()} to{" "}
                        {campaign._count.recipients} subscribers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: campaign.content }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
