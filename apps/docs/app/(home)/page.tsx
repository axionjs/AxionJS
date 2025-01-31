import Link from "next/link";
import "@/app/global.css";
import Card from "./cards";
export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <Card />
    </main>
  );
}
