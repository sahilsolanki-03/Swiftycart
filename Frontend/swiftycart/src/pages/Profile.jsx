import React from "react";

function Profile({ user, orders }) {
  return (
    <section className="section page-section">
      <div className="profile-card">
        <p className="small-title">MY ACCOUNT</p>

        <h1>
          {user?.firstname} {user?.lastname}
        </h1>

        <div className="profile-row">
          <strong>Email</strong>
          <span>{user?.email}</span>
        </div>

        <div className="profile-row">
          <strong>Account Type</strong>
          <span>User</span>
        </div>

        <div className="profile-row">
          <strong>Total Orders</strong>
          <span>
            {orders.filter((order) => order.userId === user?.id).length}
          </span>
        </div>
      </div>
    </section>
  );
}

export default Profile;
