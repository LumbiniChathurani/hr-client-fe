import { useState } from "react";

interface User {
  id: number;
  name: string;
  role: string;
}

const roles = ["Admin", "Manager", "HR", "Employee"];

const UserRolePage = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice Johnson", role: "Employee" },
    { id: 2, name: "Bob Smith", role: "HR" },
    { id: 3, name: "Charlie Brown", role: "Manager" },
  ]);

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-black dark:text-purple-50">
        🛡️ User & Role Management
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left border dark:border-slate-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-dark-purple-muted text-black dark:text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Current Role</th>
              <th className="p-3">Change Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t dark:border-slate-700">
                <td className="p-3">{user.name}</td>
                <td className="p-3 font-semibold">{user.role}</td>
                <td className="p-3">
                  <select
                    className="border rounded px-2 py-1 bg-white dark:bg-slate-800 dark:text-white"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserRolePage;
