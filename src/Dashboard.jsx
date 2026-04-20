import {   Users } from 'lucide-react';

import Patients from "./Patients.jsx";
const Dashboard = () => {



  return (
   
    <div style={{ 
      display: "flex", 
      height: "100vh", 
      width: "100%", 
      background: "#f8fafc",
      overflow: "hidden" 
    }}>
      
{/* SIDE NAVIGATION LINKS */}
      <aside style={sidebarStyle}>
        <div style={{ padding: "24px", display: "flex", alignItems: "center", gap: "12px", borderBottom: "1px solid #e2e8f0" }}>
          <div style={logoIconStyle}>P</div>
          <span style={brandTextStyle}>Dashboard</span>
        </div>
        
        <nav style={{ padding: "20px 12px" }}>
          <div style={activeNavLinkStyle}>
            <Users size={18} />
            <span style={{ fontWeight: "600", fontSize: "14px" }}>Patients</span>
          </div>
        </nav>
      </aside>
{/* SIDE NAVIGATION LINKS */}

{/* PATIENT CONTENT AREA */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Patients/> 
      </main>
{/* PATIENT CONTENT AREA */}

    </div>
  );
};



const sidebarStyle = {
  width: "260px",
  minWidth: "260px",
  background: "#fff",
  borderRight: "1px solid #e2e8f0",
  display: "flex",
  flexDirection: "column"
};

const logoIconStyle = {
  width: "32px", height: "32px",
  background: "#3b82f6", borderRadius: "8px", 
  display: "flex", alignItems: "center", justifyContent: "center", 
  color: "#fff", fontWeight: "bold"
};

const brandTextStyle = { fontSize: "18px", fontWeight: "700", color: "#1e293b" };

const activeNavLinkStyle = {
  display: "flex", alignItems: "center", gap: "12px",
  padding: "10px 16px", borderRadius: "8px",
  background: "#eff6ff", color: "#3b82f6", cursor: "default"
};


export default Dashboard;