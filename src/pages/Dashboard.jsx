import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      {/*  sidebar */}

      <Outlet></Outlet>
    </div>
  );
};
export default Dashboard;
