// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import { RiDeleteBinFill } from "react-icons/ri";

interface PostProps {
  post: string;
  setOpenBandhistorikkData: React.Dispatch<React.SetStateAction<boolean>>;
}

const Deletehistorikkpost = ({ post, setOpenBandhistorikkData }: PostProps) => {
  const router = useRouter();

  const deleteBladeApi = api.bandhistorikk.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const deletePost = () => {
    deleteBladeApi.mutate({ id: post });
    setOpenBandhistorikkData(false);
  };
  return (
    <>
      <div>
        <button onClick={deletePost}>
          <RiDeleteBinFill style={{ fontSize: "1rem", color: "indianred" }} />
        </button>
      </div>
      <div></div>
    </>
  );
};

export default Deletehistorikkpost;
