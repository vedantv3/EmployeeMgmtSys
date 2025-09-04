import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    fontFamily: 'Segoe UI, sans-serif',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '50px 60px',
    borderRadius: '20px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
    textAlign: 'center',
    width: '350px',
    transition: 'transform 0.3s ease',
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '30px',
    color: '#333',
  };

  const buttonStyle = {
    padding: '12px 25px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    width: '100%',
  };

  const registerButton = {
    ...buttonStyle,
    backgroundColor: '#667eea',
    color: '#fff',
  };

  const loginButton = {
    ...buttonStyle,
    backgroundColor: '#764ba2',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Welcome</h1>
        <p style={{ marginBottom: '20px', color: '#555' }}>Manage your employees efficiently</p>
        <button
          style={registerButton}
          onMouseOver={e => (e.target.style.backgroundColor = '#5a67d8')}
          onMouseOut={e => (e.target.style.backgroundColor = '#667eea')}
          onClick={() => navigate('/register')}
        >
          Register
        </button>
        <button
          style={loginButton}
          onMouseOver={e => (e.target.style.backgroundColor = '#643ab7')}
          onMouseOut={e => (e.target.style.backgroundColor = '#764ba2')}
          onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
