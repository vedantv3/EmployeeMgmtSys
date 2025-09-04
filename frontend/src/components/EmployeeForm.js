import { useState, useEffect } from 'react';

const EmployeeForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    position: '',
    salary: ''
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', mobile: '', email: '', position: '', salary: '' });
  };

  const formStyle = {
    display: 'grid',
    gap: '15px',
    padding: '25px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    maxWidth: '500px',
    margin: '0 auto'
  };

  const inputStyle = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    transition: 'border 0.3s',
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#2196F3',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'center', marginBottom: '15px', color: '#333' }}>
        {initialData ? 'Update Employee' : 'Add Employee'}
      </h2>
      <input
        style={inputStyle}
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="mobile"
        placeholder="Mobile"
        value={formData.mobile}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        required
      />
      <input
        style={inputStyle}
        name="salary"
        placeholder="Salary"
        type="number"
        value={formData.salary}
        onChange={handleChange}
        required
      />
      <button
        style={buttonStyle}
        type="submit"
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1976D2'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2196F3'}
      >
        {initialData ? 'Update' : 'Add'} Employee
      </button>
    </form>
  );
};

export default EmployeeForm;
