/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

interface IdProps {
  id: string;
}

export const RestoreComponent = ({ id, setOpenGjenopprettID }: IdProps) => {
  const ctx = api.useContext();
  const router = useRouter();
  const updateBlade = api.sawblades.update.useMutation({
    onSuccess: () => {
      void ctx.sawblades.getAll.invalidate();
      void ctx.sawblades.getCustomer.invalidate();
      void ctx.sawblades.getAllDeleted.invalidate();
      void ctx.sawblades.getCustomerAllDeleted.invalidate();
      void ctx.sawblades.countAllBlades.invalidate();
      setOpenGjenopprettID(null);
    },
  });

  const restoreHandler = () => {
    void updateBlade.mutate({
      id: id,
      deleted: false,
      deleteReason: "",
    });
  };

  return (
    <div onClick={restoreHandler}>
      <button>GJENOPPRETT</button>
    </div>
  );
};
