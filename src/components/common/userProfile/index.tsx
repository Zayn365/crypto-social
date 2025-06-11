"use client";
import React, { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import { useParams } from "next/navigation";
import { projectInfoData } from "@/components/dummuyData/projectInfoData";
import UserProfileContent from "./UserProfileContent";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/user";
import { getAllUserPosts } from "@/services/posts";

export default function UserProfileDetails() {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState<any>({});
  const [userPosts, setUserPosts] = useState<any>([]);

  const {
    data: userDataById,
    isLoading: userLoading,
    isFetched: userFetched,
  } = useQuery<any, Error>({
    queryKey: ["getUserById", id],
    queryFn: async () => await getUserById({ userId: Number(id) }),
    enabled: !!id,
  });

  const {
    data: allUserPostData,
    isLoading: postLoading,
    isFetched: postFetched,
  } = useQuery<any, Error>({
    queryKey: ["getAllUserPosts", id],
    queryFn: async () => await getAllUserPosts({ id: Number(id) }),
    enabled: !!id,
  });

  useEffect(() => {
    if (userFetched && userDataById?.user) {
      setUserDetails(userDataById.user);
    }
  }, [userFetched, userDataById]);

  useEffect(() => {
    if (postFetched && allUserPostData?.result) {
      const sortedPosts = [...allUserPostData.result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setUserPosts(sortedPosts);
    }
  }, [postFetched, allUserPostData]);

  const findPostById = (id: string) => {
    return projectInfoData.find((data) => data?.profile?.name === id) || null;
  };

  const projectToRender = typeof id === "string" ? findPostById(id) : null;

  if (userLoading && postLoading) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        Loading ...
      </div>
    );
  }

  return (
    <div>
      <UserProfileHeader data={userDetails} />
      <UserProfileContent data={userPosts} />
    </div>
  );
}
