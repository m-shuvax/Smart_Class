import { Link } from 'react-router-dom';
import LogoutButton from '../components/logoutButton';
import SettingsButton from '../components/settingsButton';

function Navbar() {
  return (
    <nav className="bg-gray-800 py-4 flex justify-between items-center">
      <div className="text-white font-bold ml-3">My App</div>
      <div className="flex space-x-4 items-center mr-3">
        <SettingsButton />
        <LogoutButton />
      </div>
    </nav>
  );
}

function LoginNavbar() {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">My App</div>
      </div>
    </nav>
  );
}

export default Navbar;
export { LoginNavbar };