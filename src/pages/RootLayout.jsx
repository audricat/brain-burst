import { Outlet } from "react-router-dom";

import TopNavBar from "../components/TopNavBar";

const RootLayout = () => {
  return (
    <div className="root-layout-container">
      <TopNavBar/>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
