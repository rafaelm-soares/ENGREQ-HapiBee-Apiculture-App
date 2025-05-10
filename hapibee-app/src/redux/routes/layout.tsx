import React from "react";
import { Outlet } from "react-router-dom";
import Header from "src/components/header/header";

const layout = () => (
  <React.Fragment>
    <div className="main">
      <Header />
      <Outlet />
    </div>
  </React.Fragment>
);

export default layout;
