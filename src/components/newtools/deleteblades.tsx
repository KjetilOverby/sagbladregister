// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";

interface bladeProps {
  blade: string;
}

const Deleteblades = ({ blade }: bladeProps) => {
  const router = useRouter();

  const deleteBladeApi = api.sawblades.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deleteBlade = () => {
    deleteBladeApi.mutate({ id: blade });
  };
  return (
    <>
      <div>
        <button onClick={deleteBlade}>SLETT</button>
      </div>
      <div></div>
    </>
  );
};

export default Deleteblades;
