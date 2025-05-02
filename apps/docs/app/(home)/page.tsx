// import Link from "next/link";
// import "@/app/global.css";
// import Card from "./cards";
// export default function HomePage() {
//   return (
//     <main className="flex flex-1 flex-col justify-center text-center">
//       <Card />
//     </main>
//   );
// }
import "@/app/global.css";
import Card from "./cards";
import { RegistryViewer } from "@/app/components/docs/RegistryViewer";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <Card />

      <div className="container mx-auto px-4 my-10">
        <h2 className="text-2xl font-semibold mb-4">Contact Form Component</h2>
        <p className="mb-6 text-muted-foreground">
          Source code explorer for the contact-form component
        </p>

        <RegistryViewer componentName="contact-form" style="new-york" />
      </div>
    </main>
  );
}
