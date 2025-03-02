/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import { api } from "~/utils/api";
import { useRouter } from "next/navigation";
import RoleSuperAdmin from "~/components/roles/RoleSuperAdmin";
import { roleToKundeID } from "~/utils/roleMapping"; // Hent roller automatisk

interface BrukereProps {
  theme: string;
}

const Brukere = ({ theme }: BrukereProps) => {
  const router = useRouter();
  const { data: users } = api.users.getUsers.useQuery();

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newRole, setNewRole] = useState(null);

  const updateStatus = api.users.updateRoleBrukere.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const handleRoleChange = () => {
    if (selectedUserId && newRole) {
      updateStatus.mutate({ email: selectedUserId, role: newRole });

      setTimeout(() => {
        setSelectedUserId(null);
        setNewRole(null);
      }, 200);
    }
  };

  return (
    <div data-theme={theme as string} className="min-h-screen">
      <RoleSuperAdmin>
        <HeaderComponent />
        <div className="relative h-64 w-full">
          <div className="bg-image absolute inset-0 bg-cover bg-center bg-no-repeat"></div>
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <h1 className="text-4xl text-white">Brukere</h1>
          </div>
          <style>
            {`
           .bg-image {
             background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('https://images.unsplash.com/photo-1633596683562-4a47eb4983c5?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');}
          `}
          </style>
        </div>

        {selectedUserId && (
          <div className="absolute bg-base-100 p-5 shadow-xl">
            <p className="my-5">Bytt rolle for {selectedUserId}</p>
            <div>
              <div className="py-5">
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="bg-primary"
                >
                  <option value="">Choose role</option>
                  {Object.keys(roleToKundeID).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <button
                  className="btn btn-info mb-5 text-white"
                  onClick={handleRoleChange}
                >
                  Change role
                </button>
                <button
                  className="btn btn-warning text-white"
                  onClick={() => setSelectedUserId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mx-5 mt-20 flex flex-col 2xl:mx-40">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden border-b border-primary shadow sm:rounded-lg">
                <table className="table-xs min-w-full divide-y divide-primary">
                  <thead className="bg-primary">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-base-100">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-base-100">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-base-100">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-base-100">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-base-100">
                        Bytt rolle
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary bg-base-100">
                    {users?.map((user) => (
                      <tr className="hover:bg-secondary" key={user.id}>
                        <td className="whitespace-nowrap px-6 py-1">
                          <div className="text-sm text-gray-500">
                            <img
                              src={user.image}
                              alt={user.name}
                              className="h-8 w-8 rounded-full"
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-1">
                          <div className="text-sm text-neutral">
                            {user.name}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-1">
                          <div className="text-sm text-neutral">
                            {user.email}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-6 py-1">
                          <div
                            className={`text-sm ${
                              user.role === "LOGIN"
                                ? "text-red-500"
                                : "text-gray-400"
                            }`}
                          >
                            {user.role}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-1 text-neutral">
                          <button onClick={() => setSelectedUserId(user.email)}>
                            Bytt rolle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </RoleSuperAdmin>
    </div>
  );
};

export default Brukere;
