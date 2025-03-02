/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";
import { useState } from "react";

const RoleChange = () => {
  const router = useRouter();
  const ctx = api.useContext();
  const [isOpen, setIsOpen] = useState(false);

  const updateRoles = api.users.updateRole.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleRoleChange = (role: string) => {
    void updateRoles.mutate({
      id: "",
      role: role as "ADMIN" | "USER" | "LOGIN" | "MV_ADMIN" | "MT_ADMIN",
    });
    setIsOpen(false);
  };

  return (
    <div className="relative z-50 inline-block ">
      <div>
        <li
          type="button"
          className="  text-sm text-neutral  "
          onClick={() => setIsOpen(!isOpen)}
        >
          Kunde
        </li>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-base-100 shadow-lg ring-1 ring-black ring-opacity-5"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div
            className="px-1 py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div
              onClick={() => handleRoleChange("ADMIN")}
              className="py-3 hover:bg-accent"
            >
              <a
                href="#"
                className="block px-4 py-1 text-sm text-neutral "
                role="menuitem"
              >
                Alle kunder
              </a>
              <p className="block px-4  text-xs text-primary">ADMIN</p>
            </div>
            <hr className=" border-accent" />
            <div
              onClick={() => handleRoleChange("MV_ADMIN")}
              className="py-3 hover:bg-accent"
            >
              <a
                href="#"
                className="hover:primary block px-4 py-1 text-sm text-neutral hover:bg-accent"
                role="menuitem"
              >
                Moelven Våler
              </a>
              <p className="block px-4  text-xs text-primary">MV_ADMIN</p>
            </div>
            <hr className=" border-accent" />
            <div
              onClick={() => handleRoleChange("MT_ADMIN")}
              className="py-3 hover:bg-accent"
            >
              <a
                href="#"
                className="block px-4 py-1 text-sm text-neutral hover:bg-accent"
                role="menuitem"
              >
                Moelven Trysil
              </a>
              <p className="block px-4  text-xs text-primary">MT_ADMIN</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleChange;
