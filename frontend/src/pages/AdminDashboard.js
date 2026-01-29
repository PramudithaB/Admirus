import React, { useEffect, useState } from "react";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../services/companyService";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    monthly_posts: "",
    monthly_videos: "",
    customer_type: "business",
    primary_contact: "",
    sales_person: "",
    display_name: "",
    email: "",
    office_phone: "",
    mobile_phone: "",
    address: "",
    job_card: "",
    status: "active"
  });

  const loadData = async () => {
    try {
      const res = await getCompanies();
      setCompanies(res.data);
    } catch (err) {
      console.error("Error loading data:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate('/login');
    }
  };

  // Improved Toggle Status Logic
  const handleToggleStatus = async (company) => {
    const newStatus = company.status === "active" ? "inactive" : "active";
    
    // Optimistic UI Update (Update local state first for speed)
    const updatedCompanies = companies.map((c) => 
      c.id === company.id ? { ...c, status: newStatus } : c
    );
    setCompanies(updatedCompanies);

    try {
      await updateCompany(company.id, { ...company, status: newStatus });
    } catch (err) {
      console.error("Failed to update status on server:", err);
      loadData(); // Revert to server state if error
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCompany) {
        await updateCompany(editingCompany.id, formData);
      } else {
        await createCompany(formData);
      }
      setShowForm(false);
      setEditingCompany(null);
      resetForm();
      loadData();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "", monthly_posts: "", monthly_videos: "", customer_type: "business",
      primary_contact: "", sales_person: "", display_name: "", email: "",
      office_phone: "", mobile_phone: "", address: "", job_card: "",
      status: "active"
    });
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData(company);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this customer permanently?")) {
      await deleteCompany(id);
      loadData();
    }
  };

  const totalCompanies = companies.length;
  const totalPosts = companies.reduce((a, b) => a + Number(b.monthly_posts || 0), 0);
  const totalVideos = companies.reduce((a, b) => a + Number(b.monthly_videos || 0), 0);

  const primaryBlue = "#0d6efd";
  const borderColor = "#dee2e6";

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fcfcfc", fontFamily: "'Segoe UI', Roboto, sans-serif" }}>

      {/* Sidebar */}
      <div style={sidebarStyle(primaryBlue)}>
        <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 40, color: primaryBlue }}>AdminPanel</h2>
        <nav style={{ flexGrow: 1 }}>
          <div style={{ padding: "12px 15px", backgroundColor: primaryBlue, borderRadius: 8, marginBottom: 10, cursor: "pointer", fontWeight: "600" }}>Dashboard</div>
<div
  style={{ padding: "12px 15px", color: "#adb5bd", cursor: "pointer" }}
  onClick={() => navigate("/users-list")}
>
  All Users
</div>
<div
  style={{ padding: "12px 15px", color: "#adb5bd", cursor: "pointer" }}
  onClick={() => navigate("/tasks")}
>
  Task Management
</div>
        </nav>
        <div onClick={handleLogout} style={logoutStyle}>
          <span>Logout</span><span style={{ fontSize: "12px" }}>⏻</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: 260, flex: 1, padding: "40px 50px" }}>
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1d23" }}>Customer Database</h1>
          <button onClick={() => { setEditingCompany(null); resetForm(); setShowForm(true); }} style={addBtnStyle(primaryBlue)}>
            + Add New Customer
          </button>
        </div>

        {/* Summary Cards */}
        <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
          {[{ label: "Total Clients", value: totalCompanies }, { label: "Total Posts", value: totalPosts }, { label: "Total Videos", value: totalVideos }].map((item, index) => (
            <div key={index} style={cardStyle(borderColor)}>
              <p style={{ color: "#6c757d", fontSize: 13, textTransform: "uppercase", fontWeight: "700", marginBottom: 8 }}>{item.label}</p>
              <p style={{ fontSize: 28, fontWeight: "bold", margin: 0, color: "#1a1d23" }}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Table Container */}
        <div style={tableContainer(borderColor)}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8f9fa", textAlign: "left" }}>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Client Name</th>
                <th style={thStyle}>Primary Contact</th>
                <th style={thStyle}>Status</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c, index) => (
                <tr key={c.id || index} style={{ borderTop: "1px solid #dee2e6" }}>
                  <td style={tdStyle}><span style={{ color: "#adb5bd", fontWeight: "600" }}>#{c.id || index + 1}</span></td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600, color: "#1a1d23" }}>{c.name}</div>
                    <div style={{ fontSize: "12px", color: "#6c757d" }}>{c.email}</div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: "500" }}>{c.primary_contact || "N/A"}</div>
                    <div style={{ fontSize: "12px", color: "#6c757d" }}>{c.mobile_phone}</div>
                  </td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => handleToggleStatus(c)}
                      style={statusToggleBtn(c.status === "active")}
                    >
                      {c.status === "active" ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <button onClick={() => navigate(`/company/${c.id}/dashboard`)} style={actionBtn("#0d6efd")}>View</button>
                    <button onClick={() => handleEdit(c)} style={actionBtn("#ffc107")}>Edit</button>
                    <button onClick={() => handleDelete(c.id)} style={actionBtn("#dc3545", true)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {companies.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>No customers found.</div>}
        </div>
      </div>

      {/* POPUP MODAL FORM (2x2 Grid) */}
      {showForm && (
        <div style={modalOverlay}>
          <div style={modalContent}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: "700" }}>{editingCompany ? "Edit Customer Details" : "Add New Customer"}</h2>
              <button onClick={() => setShowForm(false)} style={closeBtn}>&times;</button>
            </div>

            <form onSubmit={handleSubmit} style={formGrid}>
              {[
                { label: "Company Name", name: "name", type: "text" },
                { label: "Customer Type", name: "customer_type", type: "select", options: ["business", "individual"] },
                { label: "Display Name", name: "display_name", type: "text" },
                { label: "Primary Contact Person", name: "primary_contact", type: "text" },
                { label: "Email Address", name: "email", type: "email" },
                { label: "Sales Person", name: "sales_person", type: "text" },
                { label: "Office Phone", name: "office_phone", type: "text" },
                { label: "Mobile Phone", name: "mobile_phone", type: "text" },
                { label: "Posts Per Month", name: "monthly_posts", type: "number" },
                { label: "Videos Per Month", name: "monthly_videos", type: "number" },
                { label: "Address", name: "address", type: "text" },
                { label: "Job Card #", name: "job_card", type: "text" },
              ].map((field) => (
                <div key={field.name} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>{field.label}</label>
                  {field.type === "select" ? (
                    <select name={field.name} value={formData[field.name]} onChange={handleChange} style={inputStyle}>
                      {field.options.map(opt => <option key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</option>)}
                    </select>
                  ) : (
                    <input name={field.name} type={field.type} value={formData[field.name]} onChange={handleChange} style={inputStyle} placeholder={`Enter ${field.label}`} required={field.name === "name"} />
                  )}
                </div>
              ))}

              <div style={{ gridColumn: "span 2", marginTop: 25, display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setShowForm(false)} style={cancelBtn}>Cancel</button>
                <button type="submit" style={saveBtn}>{editingCompany ? "Update Customer" : "Save Customer"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// --- CSS-IN-JS STYLES ---

const sidebarStyle = (color) => ({ 
  width: 260, 
  backgroundColor: "#1a1d23", 
  color: "white", 
  padding: "30px 20px", 
  position: "fixed", 
  height: "100vh", 
  display: "flex", 
  flexDirection: "column",
  boxShadow: "4px 0 10px rgba(0,0,0,0.05)"
});

const logoutStyle = { 
  padding: "15px", 
  color: "#ff4d4d", 
  cursor: "pointer", 
  borderTop: "1px solid #333", 
  fontWeight: "600", 
  display: "flex", 
  alignItems: "center", 
  gap: "10px", 
  marginTop: "auto",
  fontSize: "15px"
};

const addBtnStyle = (color) => ({ 
  backgroundColor: color, 
  color: "white", 
  padding: "12px 24px", 
  border: "none", 
  borderRadius: 8, 
  fontWeight: "600", 
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(13, 110, 253, 0.2)"
});

const cardStyle = (border) => ({ 
  flex: 1, 
  padding: 25, 
  backgroundColor: "white", 
  borderRadius: 12, 
  border: `1px solid ${border}`, 
  boxShadow: "0 2px 4px rgba(0,0,0,0.02)" 
});

const tableContainer = (border) => ({ 
  backgroundColor: "white", 
  borderRadius: 12, 
  border: `1px solid ${border}`, 
  overflow: "hidden", 
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)" 
});

const thStyle = { 
  padding: "15px 20px", 
  fontWeight: 700, 
  color: "#495057", 
  fontSize: "12px", 
  textTransform: "uppercase", 
  letterSpacing: "0.8px" 
};

const tdStyle = { 
  padding: "18px 20px", 
  color: "#212529", 
  fontSize: "14px", 
  verticalAlign: "middle" 
};

const statusToggleBtn = (isActive) => ({
  backgroundColor: isActive ? "#d1e7dd" : "#f8d7da",
  color: isActive ? "#0f5132" : "#842029",
  border: `1px solid ${isActive ? "#badbcc" : "#f5c2c7"}`,
  padding: "6px 14px",
  borderRadius: "30px",
  fontSize: "12px",
  fontWeight: "700",
  cursor: "pointer",
  minWidth: "90px",
  textAlign: "center",
  transition: "all 0.2s ease"
});

const modalOverlay = { 
  position: "fixed", 
  top: 0, 
  left: 0, 
  width: "100%", 
  height: "100%", 
  backgroundColor: "rgba(0,0,0,0.6)", 
  display: "flex", 
  justifyContent: "center", 
  alignItems: "center", 
  zIndex: 1000,
  backdropFilter: "blur(4px)"
};

const modalContent = { 
  backgroundColor: "white", 
  padding: "40px", 
  borderRadius: "20px", 
  width: "95%", 
  maxWidth: "750px", 
  maxHeight: "90vh", 
  overflowY: "auto", 
  boxShadow: "0 20px 60px rgba(0,0,0,0.3)" 
};

const formGrid = { 
  display: "grid", 
  gridTemplateColumns: "1fr 1fr", 
  gap: "20px" 
};

const inputStyle = { 
  padding: "12px 16px", 
  borderRadius: "10px", 
  border: "1px solid #dee2e6", 
  outline: "none", 
  fontSize: "14px",
  backgroundColor: "#fcfcfc"
};

const labelStyle = { 
  fontSize: "11px", 
  fontWeight: "800", 
  color: "#6c757d", 
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

const closeBtn = { 
  background: "none", 
  border: "none", 
  fontSize: "32px", 
  cursor: "pointer", 
  color: "#adb5bd",
  lineHeight: "1"
};

const saveBtn = { 
  backgroundColor: "#198754", 
  color: "white", 
  padding: "14px 30px", 
  border: "none", 
  borderRadius: 10, 
  fontWeight: "700", 
  cursor: "pointer" 
};

const cancelBtn = { 
  backgroundColor: "#f8f9fa", 
  color: "#6c757d", 
  padding: "14px 30px", 
  border: "1px solid #dee2e6", 
  borderRadius: 10, 
  fontWeight: "700", 
  cursor: "pointer" 
};

const actionBtn = (color, isDelete = false) => ({
  backgroundColor: isDelete ? color : "transparent",
  color: isDelete ? "white" : color,
  border: isDelete ? "none" : `1px solid ${color}`,
  padding: "8px 16px",
  marginLeft: 8,
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "12px",
  transition: "all 0.2s"
});