/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";

const RoleChange = () => {
  const router = useRouter();

  const ctx = api.useContext();
  const updateRoles = api.users.updateRole.useMutation({
    onSuccess: () => {
      router.refresh();

      // void ctx.sawblades.getAll.invalidate();
      // void ctx.sawblades.getCustomer.invalidate();
    },
  });

  return (
    <div>
      <select
        onChange={(e) => {
          e.preventDefault();
          void updateRoles.mutate({
            id: "",
            role: e.currentTarget.value as
              | "ADMIN"
              | "USER"
              | "LOGIN"
              | "MV_ADMIN"
              | "MT_ADMIN",
          });
        }}
        className="select select-bordered select-xs w-full max-w-xs"
      >
        <option value="">Velg kunde</option>
        <option value="ADMIN">Alle</option>
        <option value="MV_ADMIN">Moelven Våler</option>
        <option value="MT_ADMIN">Moelven Trysil</option>
      </select>
    </div>
  );
};

export default RoleChange;
