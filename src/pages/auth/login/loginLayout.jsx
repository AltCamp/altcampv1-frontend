import React from 'react';
import { Outlet } from 'react-router-dom';

export default function LoginLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
