import Register from '../components/Register';

const RegisterPage = () => {
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh'
  };

  return (
    <div style={pageStyle}>
      <Register />
    </div>
  );
};

export default RegisterPage;
