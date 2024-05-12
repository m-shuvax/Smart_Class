import { Link, useLocation } from 'react-router-dom';
import LogoutButton from '../components/logoutButton';
import SettingsButton from '../components/settingsButton';

function Navbar() {
  const location = useLocation();

  const hideButtons = location.pathname === "/" || location.pathname === "/register";

  return (
    <nav className="fixed top-0 w-screen bg-gray-800 py-4 flex justify-between items-center">
      <div className="text-white font-bold ml-3">My App</div>
      {!hideButtons && (
        <div className="flex space-x-4 items-center mr-3">
          <SettingsButton />
          <LogoutButton />
        </div>
      )}
    </nav>
  );
}

export default Navbar;