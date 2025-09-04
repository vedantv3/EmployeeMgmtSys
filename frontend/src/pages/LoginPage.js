import Login from '../components/Login';

const LoginPage = () => {
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
  };

  return (
    <div style={pageStyle}>
      <Login />
    </div>
  );
};

export default LoginPage;
