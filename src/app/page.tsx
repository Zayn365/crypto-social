import Header from "@/components/common/home/Header";
import PostCard from "@/components/common/home/PostCard";
import { postsData } from "@/components/dummuyData/postsData";
import LeftSidebar from "@/components/layout/sidebar/left";
import RightSidebar from "@/components/layout/sidebar/right";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <div>
      <SidebarProvider>
        <LeftSidebar />
        <div className="w-full overflow-y-auto">
          <Header />
          <PostCard posts={postsData} />
        </div>
        <RightSidebar />
      </SidebarProvider>
    </div>
  );
}
