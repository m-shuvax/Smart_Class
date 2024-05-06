import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {LoginNavbar} from './features/Navbar';
import { RegistrationPage } from './pages/RegistrationPage'; // Import the new component
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <LoginNavbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} /> {/* Add the new route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
