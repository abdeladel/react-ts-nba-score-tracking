import * as React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <h1>NBA Score Tracking App</h1>
      <Outlet />
    </div>
  );
}

export default Layout;
