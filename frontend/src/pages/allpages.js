import React from 'react';
import Sidebar from '../components/Sidebar';
import './allpages.css';

const samplePages = [
  { id: 1, name: 'Admirus Academy', description: 'Tech learning & tutorials', likes: 1280 },
  { id: 2, name: 'Frontend Inspo', description: 'UI ideas and snippets', likes: 942 },
  { id: 3, name: 'React Helpers', description: 'Components & tips', likes: 760 },
  { id: 4, name: 'Design Studio', description: 'Design resources', likes: 410 },
  // ...add more as needed...
];

export default function AllPages() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <div className="allpages-container">
          <div className="allpages-header">
            <h1>Facebook Pages</h1>
            <p className="subtitle">Pages you manage or follow</p>
          </div>

          <div className="pages-grid">
            {samplePages.map((p) => (
              <div key={p.id} className="page-card">
                <div className="page-avatar">{p.name.charAt(0)}</div>
                <div className="page-body">
                  <h3 className="page-name">{p.name}</h3>
                  <p className="page-desc">{p.description}</p>
                </div>
                <div className="page-meta">
                  <span className="likes">👍 {p.likes}</span>
                  <button className="view-btn">View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
