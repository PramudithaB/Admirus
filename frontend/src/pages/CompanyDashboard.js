import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import {
  getCompany,
  getAnalytics,
  getScheduledPosts,
  addPost
} from '../services/companyDashboardService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function CompanyDashboard() {
  const { id: companyId } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [analytics, setAnalytics] = useState([]);
  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState({
    title: "",
    type: "photo",
    scheduled_date: "",
    status: "scheduled",
  });

  const loadAllDashboardData = async () => {
    setCompany((await getCompany(companyId)).data);
    setAnalytics((await getAnalytics(companyId)).data);
    setPosts((await getScheduledPosts(companyId)).data);
  };

  useEffect(() => {
    loadAllDashboardData();
  }, [companyId]);

  const handleAddPost = async () => {
    await addPost(companyId, form);
    setForm({ title: "", type: "photo", scheduled_date: "", status: "scheduled" });
    loadAllDashboardData();
  };

  const groupByMonth = (postList) => {
    const months = {};
    postList.forEach(post => {
      const month = new Date(post.scheduled_date).toLocaleString('en-US', { month: 'long' });
      if (!months[month]) months[month] = [];
      months[month].push(post);
    });
    return months;
  };

  const monthlyPosts = groupByMonth(posts);

  // Styles & Colors
  const primaryBlue = "#0d6efd";
  const lightGray = "#f8f9fa";
  const borderColor = "#dee2e6";

  const chartData = {
    labels: analytics.map(a => `Month ${a.month}`),
    datasets: [
      { label: 'Posts', data: analytics.map(a => a.post_count), borderColor: primaryBlue, backgroundColor: primaryBlue, tension: 0.3 },
      { label: 'Videos', data: analytics.map(a => a.video_count), borderColor: '#198754', backgroundColor: '#198754', tension: 0.3 },
    ],
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
      
      {/* Sidebar */}
      <div style={{ width: 260, backgroundColor: "#1a1d23", color: "white", padding: "30px 20px", position: "fixed", height: "100vh" }}>
        <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 40, color: primaryBlue }}>AdminPanel</h2>
        <nav>
          <div onClick={() => navigate('/')} style={{ padding: "12px 15px", color: "#adb5bd", cursor: "pointer", marginBottom: 10 }}>
            ← Back to Companies
          </div>
          <div style={{ padding: "12px 15px", backgroundColor: primaryBlue, borderRadius: 8, marginBottom: 10, cursor: "pointer" }}>
            Company View
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: 260, flex: 1, padding: "40px 50px" }}>
        
        <header style={{ marginBottom: 30 }}>
            <p style={{ color: primaryBlue, fontWeight: 600, marginBottom: 5 }}>Managing Assets for</p>
            <h1 style={{ fontSize: 32, fontWeight: 700, color: "#333", margin: 0 }}>{company?.name || "Loading..."}</h1>
        </header>

        {/* Analytics Section */}
        <div style={{ backgroundColor: "white", padding: 25, borderRadius: 12, border: `1px solid ${borderColor}`, marginBottom: 30, boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}>
          <h2 style={{ fontSize: 18, marginBottom: 20, color: "#444" }}>📊 Performance Analytics</h2>
          <div style={{ height: 300 }}>
             <Line data={chartData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
          </div>
        </div>

        {/* Add Post Form */}
        <div style={{ backgroundColor: lightGray, padding: 30, borderRadius: 12, marginBottom: 40, border: `1px solid ${borderColor}` }}>
          <h2 style={{ marginBottom: 20, fontSize: 18 }}>Schedule New Content</h2>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
            <div style={fieldWrap}><label style={labelStyle}>Post Title</label>
                <input style={inputStyle} type="text" placeholder="e.g. Summer Sale" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div style={fieldWrap}><label style={labelStyle}>Type</label>
                <select style={inputStyle} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                </select>
            </div>
            <div style={fieldWrap}><label style={labelStyle}>Date</label>
                <input style={inputStyle} type="date" value={form.scheduled_date} onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })} />
            </div>
            <div style={fieldWrap}><label style={labelStyle}>Status</label>
                <select style={inputStyle} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="scheduled">Scheduled</option>
                    <option value="published">Published</option>
                </select>
            </div>
            <button
                onClick={handleAddPost}
                disabled={!form.title || !form.scheduled_date}
                style={{ ...btnPrimary, backgroundColor: (!form.title || !form.scheduled_date) ? "#ccc" : primaryBlue }}
            >
                Schedule
            </button>
          </div>
        </div>

        {/* Month-wise Tables */}
        <h2 style={{ marginBottom: 20, fontSize: 22, fontWeight: 600 }}>📅 Content Calendar</h2>
        {Object.keys(monthlyPosts).length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "#999", border: `1px dashed ${borderColor}`, borderRadius: 12 }}>No content scheduled yet.</div>
        ) : (
          Object.keys(monthlyPosts).map((month) => (
            <div key={month} style={{ marginBottom: 30, backgroundColor: "white", borderRadius: 12, border: `1px solid ${borderColor}`, overflow: "hidden" }}>
              <div style={{ padding: "15px 20px", backgroundColor: lightGray, borderBottom: `1px solid ${borderColor}`, fontWeight: "bold", color: "#333" }}>
                {month}
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th style={thStyle}>Title</th>
                    <th style={thStyle}>Type</th>
                    <th style={thStyle}>Date</th>
                    <th style={thStyle}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyPosts[month].map((post) => (
                    <tr key={post.id} style={{ borderTop: `1px solid ${borderColor}` }}>
                      <td style={tdStyle}><strong>{post.title}</strong></td>
                      <td style={tdStyle}><span style={badgeStyle(post.type)}>{post.type}</span></td>
                      <td style={tdStyle}>{post.scheduled_date}</td>
                      <td style={{ ...tdStyle, color: getStatusColor(post.status), fontWeight: 600 }}>
                        ● {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Helpers & Sub-styles
const fieldWrap = { display: "flex", flexDirection: "column", gap: 5 };
const labelStyle = { fontSize: 12, color: "#666", fontWeight: 600 };
const inputStyle = { padding: "10px", borderRadius: 6, border: "1px solid #ced4da", outline: "none", fontSize: 14 };
const thStyle = { padding: "12px 20px", fontSize: 13, color: "#888", textTransform: "uppercase" };
const tdStyle = { padding: "15px 20px", fontSize: 15 };
const btnPrimary = { padding: "11px 25px", color: "white", border: "none", borderRadius: 6, fontWeight: "600", cursor: "pointer", height: "40px" };

const badgeStyle = (type) => ({
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    backgroundColor: type === "video" ? "#fff3cd" : "#e2e3e5",
    color: type === "video" ? "#856404" : "#383d41",
    textTransform: "capitalize"
});

const getStatusColor = (status) => {
    if (status === "published") return "#198754";
    if (status === "deleted") return "#dc3545";
    return "#fd7e14"; // scheduled
};

export default CompanyDashboard;