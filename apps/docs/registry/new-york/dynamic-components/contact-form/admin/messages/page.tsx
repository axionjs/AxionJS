import { getMessages } from "@/registry/new-york/dynamic-components/contact-form/actions/contact-actions";
import { MessageList } from "@/registry/new-york/dynamic-components/contact-form/components/message-list";

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
      <MessageList initialMessages={messages} />
    </div>
  );
}
