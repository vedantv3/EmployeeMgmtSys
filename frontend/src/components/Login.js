import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await login(formData);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/employees'), 1000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
      if (msg === 'User not found') {
        setTimeout(() => navigate('/register'), 1500); // redirect to register if account doesn't exist
      }
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px 50px',
        borderRadius: '20px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
        width: '350px',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '25px', color: '#333' }}>Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              margin: '10px 0',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
            }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px',
              margin: '10px 0',
              borderRadius: '8px',
              border: '1px solid #ccc',
              outline: 'none',
            }}
            required
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '15px',
              border: 'none',
              borderRadius: '10px',
              backgroundColor: '#2196F3',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => e.target.style.backgroundColor = '#1976d2'}
            onMouseOut={e => e.target.style.backgroundColor = '#2196F3'}
          >
            Login
          </button>
        </form>

        {error && <div style={{ color: 'red', marginTop: '15px' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: '15px' }}>{success}</div>}

        <p style={{ marginTop: '20px', color: '#555' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/register')}
            style={{ color: '#764ba2', cursor: 'pointer', fontWeight: '600' }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
