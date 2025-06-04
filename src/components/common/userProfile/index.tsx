"use client";
import React, { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import { useParams } from "next/navigation";
import { projectInfoData } from "@/components/dummuyData/projectInfoData";
import UserProfileContent from "./UserProfileContent";
import useUrl from "@/hooks/useUrl";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/user";
import { getAllUserPosts } from "@/services/posts";

export default function UserProfileDetails() {
  const { id } = useParams();
  const { query } = useUrl();
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState<any>({});
  const [userPosts, setUserPosts] = useState<any>([]);

  const { data: userDataById } = useQuery<any, Error>({
    queryKey: ["getUserById"],
    queryFn: async () => await getUserById({ userId: Number(query?.id) }),
  });

  const { data: allUserPostData } = useQuery<any, Error>({
    queryKey: ["getAllUserPosts"],
    queryFn: async () => await getAllUserPosts({ id: Number(query?.id) }),
  });

  useEffect(() => {
    if (user?.id) {
      setUserDetails(userDataById?.user);
      setUserPosts(allUserPostData?.result);
    }
  }, [user?.id]);

  const findPostById = (id: string) => {
    return projectInfoData.find((data) => data?.profile?.name === id) || null;
  };

  const projectToRender = typeof id === "string" ? findPostById(id) : null;
  return (
    <div>
      <UserProfileHeader data={userDetails} />
      <UserProfileContent data={userPosts} />
    </div>
  );
}
