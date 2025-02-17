import { Metadata } from "next";
import Dashboard from "./dashboard/page";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Main dashboard view",
};

export default function HomePage() {
  return <Dashboard />;
}
