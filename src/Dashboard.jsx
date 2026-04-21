import { useState, useEffect } from 'react';
import { Users, Menu, X } from 'lucide-react';
import Patients from "./pages/Patients.jsx";


const Dashboard = () => {

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
      const handleResize = () => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        if (!mobile) setSidebarOpen(false);
      };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div style={containerStyle}>
      
      {isMobile && isSidebarOpen && (
        <div onClick={toggleSidebar} style={overlayStyle} />
      )}

{/* LEFT SIDE NAVIGATION MENU*/}
      <aside style={{
        ...sidebarStyle,
       
        left: isMobile ? (isSidebarOpen ? "0" : "-260px") : "0",
        position: isMobile ? "fixed" : "relative",
      }}>
        <div style={sidebarHeaderStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={logoIconStyle}>P</div>
            <span style={brandTextStyle}>Dashboard</span>
          </div>
          
          {isMobile && <X onClick={toggleSidebar} size={20} style={{ cursor: 'pointer', color: '#64748b' }} />}
        </div>
        
        <nav style={{ padding: "20px 12px" }}>
          <div style={activeNavLinkStyle}>
            <Users size={18} />
            <span style={{ fontWeight: "600", fontSize: "14px" }}>Patients</span>
          </div>
        </nav>
      </aside>
{/* LEFT SIDE NAVIGATION MENU*/}

{/* PATIENT CONTENT AREA */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {isMobile && (
          <header style={mobileHeaderStyle}>
            <Menu onClick={toggleSidebar} style={{ cursor: 'pointer' }} />
            <span style={{ fontWeight: "bold" }}>Dashboard</span>
            <div style={{ width: 24 }} /> 
          </header>
        )}

        <div style={{ flex: 1, overflowY: "auto" }}>
          <Patients />
        </div>
      </main>
{/* PATIENT CONTENT AREA */}

    </div>
  );
};



const containerStyle = {
  display: "flex",
  height: "100vh",
  width: "100%",
  background: "#f8fafc",
  overflow: "hidden",
  position: "relative"
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0, 0, 0, 0.3)",
  zIndex: 40,
  backdropFilter: "blur(2px)"
};

const sidebarStyle = {
  width: "260px",
  minWidth: "260px",
  background: "#fff",
  borderRight: "1px solid #e2e8f0",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  zIndex: 50,
  transition: "left 0.3s ease-in-out" 
};

const sidebarHeaderStyle = {
  padding: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid #e2e8f0"
};

const mobileHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  height: "60px",
  background: "#fff",
  borderBottom: "1px solid #e2e8f0"
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