/* eslint-disable @typescript-eslint/no-unsafe-call */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useState } from "react";
import HeaderComponent from "~/components/reusable/HeaderComponent";
import { api } from "~/utils/api";

const Brukere = ({ theme }) => {
  const { data: users } = api.users.getUsers.useQuery({});

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newRole, setNewRole] = useState(null);

  const updateStatus = api.users.updateRole.useMutation({
    onSuccess: () => {
      api.users.getUsers.invalidate();
    },
  });

  const handleRoleChange = () => {
    if (selectedUserId && newRole) {
      updateStatus.mutate({ id: selectedUserId, role: newRole });
      setSelectedUserId(null);
      setNewRole(null);
    }
  };

  return (
    <div data-theme={theme as string} className="min-h-screen">
      <HeaderComponent />

      {selectedUserId && (
        <div>
          <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
            <option value="">Choose role</option>
            <option value="LOGIN">ADMIN</option>
            <option value="USER">ADMIN</option>
            <option value="MV_ADMIN">ADMIN</option>
            <option value="MT_ADMIN">MV_ADMIN</option>
            {/* Add more roles as needed */}
          </select>
          <button onClick={handleRoleChange}>Change role</button>
        </div>
      )}

      <div className="mt-20 flex flex-col lg:mx-96">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users?.map((user, personIdx) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">{user.name}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">
                          <img
                            src={user.image}
                            alt={user.name}
                            className="h-10 w-10 rounded-full"
                          />
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-500">{user.role}</div>
                        <button onClick={() => setSelectedUserId(user.id)}>
                          Change role
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
    </div>
  );
};

export default Brukere;
