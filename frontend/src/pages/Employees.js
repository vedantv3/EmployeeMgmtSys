import { useContext, useEffect, useState, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/employeeApi'; // Axios instance pointing to backend
import { useNavigate } from 'react-router-dom';

const Employees = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- State ---
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    position: '',
    salary: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  // --- Fetch employees function memoized ---
  const fetchEmployees = useCallback(async () => {
    try {
      const res = await api.get('/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  // --- Fetch employees on mount ---
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchEmployees();
    }
  }, [token, fetchEmployees, navigate]);

  // --- Handlers ---
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/employees/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditingId(null);
      } else {
        await api.post('/employees', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setFormData({ name: '', email: '', mobile: '', position: '', salary: '' });
      fetchEmployees();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add/update employee');
    }
  };

  const handleEdit = (emp) => {
    setEditingId(emp._id);
    setFormData({
      name: emp.name,
      email: emp.email,
      mobile: emp.mobile,
      position: emp.position,
      salary: emp.salary
    });
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Styles ---
  const containerStyle = {
    minHeight: '100vh',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    fontFamily: 'Segoe UI, sans-serif'
  };
  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '30px',
    maxWidth: '900px',
    margin: '0 auto',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
  };
  const titleStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#333',
    marginBottom: '20px'
  };
  const logoutStyle = {
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
  };
  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '10px 0',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '16px'
  };
  const buttonStyle = {
    padding: '12px',
    margin: '10px 0',
    borderRadius: '10px',
    border: 'none',
    width: '100%',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    backgroundColor: '#667eea',
    color: '#fff',
    transition: 'all 0.3s ease'
  };
  const deleteButtonStyle = { ...buttonStyle, backgroundColor: '#f44336' };
  const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '20px' };
  const thtdStyle = { border: '1px solid #ddd', padding: '10px', textAlign: 'left', borderRadius: '10px' };
  const errorStyle = { color: 'red', marginTop: '10px', textAlign: 'center' };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={titleStyle}>
          <h2>Employees</h2>
          <button
            style={logoutStyle}
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>

        {/* Employee Form */}
        <form onSubmit={handleAddOrUpdate}>
          <input
            style={inputStyle}
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            name="position"
            placeholder="Position"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            required
          />
          <input
            style={inputStyle}
            type="number"
            name="salary"
            placeholder="Salary"
            value={formData.salary}
            onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
            required
          />
          <button type="submit" style={buttonStyle}>
            {editingId ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>
        {error && <div style={errorStyle}>{error}</div>}

        {/* Employee Table */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thtdStyle}>Name</th>
              <th style={thtdStyle}>Email</th>
              <th style={thtdStyle}>Mobile</th>
              <th style={thtdStyle}>Position</th>
              <th style={thtdStyle}>Salary</th>
              <th style={thtdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td style={thtdStyle}>{emp.name}</td>
                <td style={thtdStyle}>{emp.email}</td>
                <td style={thtdStyle}>{emp.mobile}</td>
                <td style={thtdStyle}>{emp.position}</td>
                <td style={thtdStyle}>${emp.salary}</td>
                <td style={thtdStyle}>
                  <button style={buttonStyle} onClick={() => handleEdit(emp)}>
                    Edit
                  </button>
                  <button style={deleteButtonStyle} onClick={() => handleDelete(emp._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
