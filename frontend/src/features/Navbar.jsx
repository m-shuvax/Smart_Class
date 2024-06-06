import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from '../components/logoutButton';
import AccountEditButton from '../components/accountEditButton';
import { useAppContext } from '../Context';

function Navbar() {
  const location = useLocation();
  const { user } = useAppContext();

  const hideButtons = location.pathname === "/" || location.pathname === "/register";
  const hideButtons2 = location.pathname === "/UpdateDetails";

  return (
    <nav className="fixed top-0 w-screen bg-gray-800 py-4 flex justify-between items-center">
      <div className="text-neutral-50 font-bold ml-3 text-4xl flex items-center">
        <h1>Smart Class</h1>
        {user && !hideButtons && !hideButtons2 && (
          <div className="text-xl text-neutral-50 font-bold ml-8 mt-2">{`Hi, ${user.firstName} ${user.lastName}`}</div>
        )}
      </div>
      <div className="flex items-center mr-8">
        {!hideButtons2 && !hideButtons && (
          <div>
            <AccountEditButton />
          </div>
        )}
        {!hideButtons && (
          <div>
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
