"use client";
import React, { useEffect, useState } from "react";
import UserProfileHeader from "./UserProfileHeader";
import { useParams } from "next/navigation";
import { projectInfoData } from "@/components/dummuyData/projectInfoData";
import UserProfileContent from "./UserProfileContent";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/services/user";
import { getAllUserPosts } from "@/services/posts";
import { useAuth } from "@/providers/AuthProvider";

export default function UserProfileDetails() {
  const { allUsers } = useAuth();
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
      const rawUser = userDataById.user;

      const matchedUser = allUsers?.find(
        (user: any) => Number(user?.id) === Number(id)
      );

      const userWithAssets = {
        ...rawUser,
        assets: matchedUser?.assets || null,
      };

      setUserDetails(userWithAssets);
    }
  }, [userFetched, userDataById]);

  useEffect(() => {
    if (postFetched && allUserPostData?.result && allUsers?.length) {
      const sortedPosts = [...allUserPostData.result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      const enrichedPosts = sortedPosts?.map((post: any) => {
        // Enrich post creator (top-level userInfo)
        const postCreator = allUsers?.find(
          (user: any) =>
            user?.wallet_address?.toLowerCase() ===
            post?.userInfo?.wallet_address?.toLowerCase()
        );

        // Enrich each postInfo.userInfo if present
        const enrichedPostInfo = Array.isArray(post.postInfo)
          ? post.postInfo.map((info: any) => {
              const infoUser = allUsers?.find(
                (user: any) =>
                  user?.wallet_address?.toLowerCase() ===
                  info?.userInfo?.wallet_address?.toLowerCase()
              );

              return {
                ...info,
                userInfo: {
                  ...info?.userInfo,
                  assets: infoUser?.assets || null,
                },
              };
            })
          : [];

        return {
          ...post,
          userInfo: {
            ...post.userInfo,
            assets: postCreator?.assets || null,
          },
          postInfo: enrichedPostInfo,
        };
      });

      setUserPosts(enrichedPosts);
    }
  }, [postFetched, allUserPostData, allUsers]);

  if (userLoading && postLoading) {
    return (
      <div className="h-[100vh] w-full flex justify-center items-center">
        Loading...
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
