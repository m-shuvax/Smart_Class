import { Link, useLocation } from 'react-router-dom';
import LogoutButton from '../components/logoutButton';
import AccountEditButton from '../components/accountEditButton';

function Navbar() {
  const location = useLocation();

  const hideButtons = location.pathname === "/" || location.pathname === "/register";
  const hideButtons2 = location.pathname === "/UpdateDetails";

  return (
    <nav className="fixed top-0 w-screen bg-gray-800 py-4 flex justify-between items-center">
      <div className="text-neutral-50 font-bold ml-3 text-4xl"><h1>Smart Class</h1></div>
      {!hideButtons && (
        <div className="flex space-x-4 items-center mr-8">
          {!hideButtons2 && (<div>
            <AccountEditButton />
          </div>
          )}
          <LogoutButton />
        </div>
      )}
    </nav>
  );
}

export default Navbar;
