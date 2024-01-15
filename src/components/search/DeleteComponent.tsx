// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";

interface AnyProps {
  id: string;
  deleteReason: string;
  wasteReasonInput: string;
}

export const DeleteComponent = ({ id, wasteReasonInput }: AnyProps) => {
  const ctx = api.useContext();
  const updateBlade = api.sawblades.update.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
    },
  });
  return (
    <div
      onClick={() =>
        void updateBlade.mutate({
          id: id,
          deleted: true,
          deleteReason: wasteReasonInput,
        })
      }
    >
      <button>SLETT</button>
    </div>
  );
};
