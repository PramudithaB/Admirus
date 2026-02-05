import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { updatePostStatus } from "../services/companyDashboardService";


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
    status: "scheduled"
  });

  // Load all data
  const loadAllDashboardData = async () => {
    setCompany((await getCompany(companyId)).data);
    setAnalytics((await getAnalytics(companyId)).data);
    setPosts((await getScheduledPosts(companyId)).data);
  };
const changeStatus = async (postId, newStatus) => {
  try {
    await updatePostStatus(postId, newStatus);
    loadAllDashboardData(); // reload table
  } catch (error) {
    console.error("Status update failed:", error);
    alert("Failed to update status");
  }
};

  useEffect(() => {
    loadAllDashboardData();
  }, [companyId]);

  // Add Post
  const handleAddPost = async () => {
    await addPost(companyId, form);
    setForm({ title: "", type: "photo", scheduled_date: "", status: "scheduled" });
    loadAllDashboardData();
  };

  // Group posts by month
  const groupByMonth = (list) => {
    const months = {};
    list.forEach(item => {
      const month = new Date(item.scheduled_date).toLocaleString('en-US', { month: 'long' });
      if (!months[month]) months[month] = [];
      months[month].push(item);
    });
    return months;
  };

  const monthlyPosts = groupByMonth(posts);

  // ==============================
  // DOWNLOAD PDF REPORT
  // ==============================
  const downloadMonthlyReport = (month, list) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Monthly Content Report - ${month}`, 14, 20);

    const tableRows = list.map(p => [
      p.title,
      p.type,
      p.scheduled_date,
      p.status
    ]);

    autoTable(doc, {
      head: [["Title", "Type", "Date", "Status"]],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 11 }
    });

    doc.save(`${month}-report.pdf`);
  };

  // Colors
  const primaryBlue = "#0d6efd";
  const lightGray = "#f8f9fa";
  const borderColor = "#dee2e6";

  const chartData = {
    labels: analytics.map(a => `Month ${a.month}`),
    datasets: [
      { label: 'Posts', data: analytics.map(a => a.post_count), borderColor: primaryBlue, tension: 0.3 },
      { label: 'Videos', data: analytics.map(a => a.video_count), borderColor: '#198754', tension: 0.3 },
    ],
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fff" }}>
      
      {/* Sidebar */}
      <div style={{
        width: 260,
        backgroundColor: "#1a1d23",
        color: "white",
        padding: "30px 20px",
        position: "fixed",
        height: "100vh"
      }}>
        <h2 style={{ color: primaryBlue, fontSize: 22, fontWeight: "bold", marginBottom: 40 }}>
          AdminPanel
        </h2>

        <div
          onClick={() => navigate('/')}
          style={{ color: "#adb5bd", padding: "12px 15px", cursor: "pointer" }}
        >
          ← Back to Companies
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: 260, flex: 1, padding: "40px 50px" }}>
        
        {/* Header */}
        <header style={{ marginBottom: 30 }}>
          <p style={{ color: primaryBlue, fontWeight: 600 }}>Managing Assets for</p>
          <h1 style={{ fontSize: 32, fontWeight: 700 }}>{company?.name || "Loading..."}</h1>
        </header>

        {/* Analytics */}
        <div style={{
          backgroundColor: "white",
          padding: 25,
          borderRadius: 12,
          border: `1px solid ${borderColor}`,
          marginBottom: 30
        }}>
          <h2>📊 Performance Analytics</h2>
          <div style={{ height: 300 }}>
            <Line data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Add Post Form */}
        <div style={{
          backgroundColor: lightGray,
          padding: 30,
          borderRadius: 12,
          marginBottom: 40
        }}>
<h2 style={{ color: "black" }}>Schedule New Content</h2>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 12 }}>
            
            {/* Title */}
            <div style={fieldWrap}>
              <label style={labelStyle}>Title</label>
              <input
                style={inputStyle}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>

            {/* Type */}
            <div style={fieldWrap}>
              <label style={labelStyle}>Type</label>
              <select
                style={inputStyle}
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
              >
                <option value="photo">Photo</option>
                <option value="video">Video</option>
              </select>
            </div>

            {/* Date */}
            <div style={fieldWrap}>
              <label style={labelStyle}>Date</label>
              <input
                type="date"
                style={inputStyle}
                value={form.scheduled_date}
                onChange={(e) => setForm({ ...form, scheduled_date: e.target.value })}
              />
            </div>

            {/* Status */}
            <div style={fieldWrap}>
              <label style={labelStyle}>Status</label>
              <select
                style={inputStyle}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <button
              onClick={handleAddPost}
              disabled={!form.title || !form.scheduled_date}
              style={{
                padding: "10px 20px",
                backgroundColor: (!form.title || !form.scheduled_date) ? "#ccc" : primaryBlue,
                color: "white",
                border: "none",
                borderRadius: 6,
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              Schedule
            </button>
          </div>
        </div>

        {/* Month-wise Tables */}
        <h2 style={{ marginBottom: 20 }}>📅 Content Calendar</h2>

        {Object.keys(monthlyPosts).map((month) => (
          <div key={month} style={{
            backgroundColor: "white",
            borderRadius: 12,
            border: `1px solid ${borderColor}`,
            marginBottom: 30
          }}>
            
            {/* Month Title + Download Button */}
            <div style={{
              padding: "15px 20px",
              backgroundColor: lightGray,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <span style={{ fontWeight: 700 }}>{month}</span>

              <button
                onClick={() => downloadMonthlyReport(month, monthlyPosts[month])}
                style={{
                  padding: "6px 14px",
                  backgroundColor: primaryBlue,
                  color: "white",
                  borderRadius: 6,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600
                }}
              >
                Download Report
              </button>
            </div>

            {/* Table */}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={thStyle}>Title</th>
                  <th style={thStyle}>Type</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>

              <tbody>
                {monthlyPosts[month].map((p) => (
                  <tr key={p.id} style={{ borderTop: `1px solid ${borderColor}` }}>
                    <td style={tdStyle}>{p.title}</td>
                    <td style={tdStyle}>{p.type}</td>
                    <td style={tdStyle}>{p.scheduled_date}</td>
<td style={tdStyle}>
  <select
    value={p.status}
    onChange={(e) => changeStatus(p.id, e.target.value)}
    style={{
      padding: "6px 10px",
      borderRadius: 6,
      border: "1px solid #ced4da",
      fontWeight: 600,
      cursor: "pointer"
    }}
  >
    <option value="scheduled">Scheduled</option>
    <option value="published">Published</option>
    <option value="delivered">Delivered</option>
  </select>
</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        ))}

      </div>
    </div>
  );
}

/* Styles */
const fieldWrap = { display: "flex", flexDirection: "column", gap: 5 };
const labelStyle = { fontSize: 12, color: "#666", fontWeight: 600 };
const inputStyle = { padding: "10px", borderRadius: 6, border: "1px solid #ced4da" };
const thStyle = { padding: "12px 20px", fontSize: 14, fontWeight: 700, color: "#000" };
const tdStyle = { padding: "15px 20px", fontSize: 15, color: "#000" };

export default CompanyDashboard;
