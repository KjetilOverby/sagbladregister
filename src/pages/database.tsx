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

export default function Database({ theme }: adminProps) {
  const { data: sessionData } = useSession();

  const { data: tables } = api.post.getTableSizes.useQuery({});

  return (
    <div data-theme={theme} className="min-h-screen bg-base-100">
      {sessionData && sessionData.user.role === "ADMIN" && (
        <>
          <HeaderComponent />
          <div>
            <p className="mb-2 py-10 text-center text-3xl text-neutral">
              PlanetScale{" "}
            </p>
          </div>
          <div className="px-1 xl:px-96">
            <StorageUsage tables={tables} />
          </div>
        </>
      )}
    </div>
  );
}
