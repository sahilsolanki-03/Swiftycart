import React from "react";
import AdminLayout from "../../components/AdminLayout";

function AdminUsers({ users, go, logout }) {
  return (
    <AdminLayout go={go} logout={logout}>
      <div className="admin-panel">
        <div className="panel-header">
          <div>
            <p className="small-title">CUSTOMERS</p>
            <h2>Registered Users ({users.length})</h2>
          </div>
        </div>

        {!users.length ? (
          <div className="empty-box">No registered users yet.</div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Registered</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>
                      {u.firstname} {u.lastname}
                    </td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      {u.createdAt
                        ? new Date(u.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;
