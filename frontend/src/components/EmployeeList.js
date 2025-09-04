const EmployeeList = ({ employees, onEdit, onDelete }) => {
  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px'
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const actionsStyle = {
    marginTop: '15px',
    display: 'flex',
    gap: '10px'
  };

  const buttonStyle = {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const editStyle = { ...buttonStyle, backgroundColor: '#007bff', color: 'white' };
  const deleteStyle = { ...buttonStyle, backgroundColor: '#dc3545', color: 'white' };

  return (
    <div style={containerStyle}>
      {employees.map((emp) => (
        <div
          key={emp._id}
          style={cardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
          }}
        >
          <h3 style={{ margin: 0, color: '#333' }}>{emp.name}</h3>
          <p style={{ margin: '5px 0', color: '#555' }}>Email: {emp.email}</p>
          <p style={{ margin: '5px 0', color: '#555' }}>Mobile: {emp.mobile}</p>
          <p style={{ margin: '5px 0', color: '#555' }}>Position: {emp.position}</p>
          <p style={{ margin: '5px 0', color: '#555' }}>Salary: ${emp.salary}</p>
          <div style={actionsStyle}>
            <button
              style={editStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
              onClick={() => onEdit(emp)}
            >
              Edit
            </button>
            <button
              style={deleteStyle}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
              onClick={() => onDelete(emp._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
