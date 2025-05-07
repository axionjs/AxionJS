// import { getMessages } from "@/registry/new-york/dynamic-components/contact-form/actions/contact-actions";
import { MessageList } from "@/registry/new-york/dynamic-components/contact-form/components/message-list";

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: Date;
};

export default async function AdminMessagesPage() {
  const messages: Message[] = []; // Placeholder value

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Contact Messages</h1>
      <MessageList initialMessages={messages} />
    </div>
  );
}
