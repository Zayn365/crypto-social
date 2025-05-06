import LeftSidebar from "@/components/layout/sidebar/left";
import RightSidebar from "@/components/layout/sidebar/right";
import { SidebarProvider } from "@/components/ui/sidebar";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <SidebarProvider>
        <LeftSidebar />
        <div className="w-full">klsadflksdlk</div>
        <RightSidebar />
      </SidebarProvider>
    </div>
  );
}
