import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Register from './components/Register';
import Login from './components/Login';
import Employees from './pages/Employees';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
