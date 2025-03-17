import InnerDashboardProvider from "./components/InnerDashboardProvider";
import InnerDashboardUser from "./components/InnerDashboardUser";

const Dashboard = () => {
  return (
    <>
      <InnerDashboardProvider />
      <InnerDashboardUser />
    </>
  );
};

export default Dashboard;
