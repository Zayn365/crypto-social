import Header from "@/components/common/home/Header";
import PostCard from "@/components/common/home/PostCard";
import LeftSidebar from "@/components/layout/sidebar/left";
import RightSidebar from "@/components/layout/sidebar/right";
import SideBarTriggerButton from "@/components/layout/sidebar/trigger-btn";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div>
      <SidebarProvider>
        <div className="flex lg:flex-row flex-col min-h-screen w-full">
          <LeftSidebar />
          <SideBarTriggerButton />
          <div className="flex flex-col w-full overflow-y-auto">
            <Header />
            <PostCard />
          </div>
          <RightSidebar />
        </div>
      </SidebarProvider>
    </div>
  );
}
