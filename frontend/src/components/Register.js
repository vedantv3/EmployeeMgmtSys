import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await register(formData);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/employees'), 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
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
        textAlign: 'center',
      }}>
        <h2 style={{ marginBottom: '25px', color: '#333' }}>Register</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
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
              backgroundColor: '#667eea',
              color: '#fff',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => e.target.style.backgroundColor = '#5a67d8'}
            onMouseOut={e => e.target.style.backgroundColor = '#667eea'}
          >
            Register
          </button>
        </form>

        {error && <div style={{ color: 'red', marginTop: '15px' }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: '15px' }}>{success}</div>}

        <p style={{ marginTop: '20px', color: '#555' }}>
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            style={{ color: '#764ba2', cursor: 'pointer', fontWeight: '600' }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
