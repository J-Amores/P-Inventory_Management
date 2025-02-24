import Image from "next/image";
import { ModeToggle } from "./components/mode-toggle";
import DashboardPage from "./dashboard/page";

export default function Home() {
  return (
    <div>
      <DashboardPage />
      <ModeToggle />
    </div>
  );
}
