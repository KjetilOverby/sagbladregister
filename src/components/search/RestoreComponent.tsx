// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

interface IdProps {
  id: string;
}

export const RestoreComponent = ({ id }: IdProps) => {
  const router = useRouter();
  const updateBlade = api.sawblades.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  return (
    <div
      onClick={() =>
        void updateBlade.mutate({
          id: id,
          deleted: false,
          deleteReason: "",
        })
      }
    >
      <button>GJENOPPRETT</button>
    </div>
  );
};
