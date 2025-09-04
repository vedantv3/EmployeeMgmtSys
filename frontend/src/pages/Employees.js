// Fetch employees
const fetchEmployees = async () => {
  try {
    const res = await axios.get(
      'https://employeemgmtsys-2.onrender.com/api/employees',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEmployees(res.data);
  } catch (err) {
    console.error(err);
  }
};

// Add or update employee
const handleAddOrUpdate = async (e) => {
  e.preventDefault();
  try {
    if (editingId) {
      await axios.put(
        `https://employeemgmtsys-2.onrender.com/api/employees/${editingId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingId(null);
    } else {
      await axios.post(
        'https://employeemgmtsys-2.onrender.com/api/employees',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    setFormData({ name: '', email: '', mobile: '', position: '', salary: '' });
    fetchEmployees();
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to add/update employee');
  }
};

// Delete employee
const handleDelete = async (id) => {
  try {
    await axios.delete(
      `https://employeemgmtsys-2.onrender.com/api/employees/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchEmployees();
  } catch (err) {
    console.error(err);
  }
};
