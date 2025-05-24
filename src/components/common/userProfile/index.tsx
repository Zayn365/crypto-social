"use client";
import React from "react";
import UserProfileHeader from "./UserProfileHeader";
import { useParams } from "next/navigation";
import { projectInfoData } from "@/components/dummuyData/projectInfoData";
import UserProfileContent from "./UserProfileContent";

export default function UserProfileDetails() {
  const { id } = useParams();

  const findPostById = (id: string) => {
    return projectInfoData.find((data) => data?.profile?.name === id) || null;
  };

  const projectToRender = typeof id === "string" ? findPostById(id) : null;
  return (
    <div>
      <UserProfileHeader data={projectToRender} />
      <UserProfileContent data={projectToRender} />
    </div>
  );
}
