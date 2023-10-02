import React from "react";
import WithAuth from "../../../component/WithAuth";

const Dashboard = () => {
  return <div>Dashboard</div>;
};
const WithAuthDashboard = WithAuth(Dashboard);
export default WithAuthDashboard;
