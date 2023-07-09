import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default function LoginGroup() {
  const location = useLocation();
  // console.log(location)
  return (
    <div>
      <Outlet />
    </div>
  );
}
