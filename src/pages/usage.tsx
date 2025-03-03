/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import { api } from "~/utils/api";
import { getKundeID } from "~/utils/roleMapping";
import StorageUsage from "~/components/startpage/StorageUsage";
import MemoryUsage from "~/components/startpage/MemoryUsage";
import HeaderComponent from "~/components/reusable/HeaderComponent";

interface adminProps {
  theme: string;
  newblades?: Array<{ id: number; name: string; createdAt: string }>; // Add the newblades property
  deletedblades?: Array<{ id: number; name: string; deletedAt: string }>;
  servicepost?: Array<{ id: number; name: string; date: string }>;
  servicepostKS?: Array<{ id: number; name: string; date: string }>;
  dateValue?: { startDate: string; endDate: string };
  setDateValue?: React.Dispatch<
    React.SetStateAction<{ startDate: string; endDate: string }>
  >;
  servicepostUpdate?: Array<{ id: number; name: string; date: string }>;
}

export default function Usage({ theme }: adminProps) {
  const { data: sessionData } = useSession();

  const { data: tables } = api.post.getTableSizes.useQuery({});
  const { data: queryStats } = api.post.getQueryStats.useQuery({});

  console.log("queryStats", queryStats);

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      <HeaderComponent />

      {sessionData && sessionData.user.role === "ADMIN" && (
        <>
          <StorageUsage tables={tables} />
          <MemoryUsage tables={queryStats} />
        </>
      )}
    </div>
  );
}
