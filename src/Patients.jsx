import React, { useState } from "react";
import {    PlusCircle,    Pencil,   Trash2,   Eye,   Search } from 'lucide-react';

function Patients() {
      const [patients, setPatients] = useState([
    { id: 1, firstName: "John", lastName: "Doe","phone":"+758479875473", email: "john.doe@example.com", age: 45, gender: "Male", condition: "Stable" },
    { id: 2, firstName: "Jane", lastName: "Smith", phone: "+758479875474", email: "jane.smith@example.com", age: 32, gender: "Female", condition: "Recovering" },
  ]);

  return (
    <> 
{/* PATIENT PAGE HEADER */}
        <header style={headerStyle}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search style={searchIconStyle} size={18} />
            <input 
              type="text" 
              placeholder="Search patients..." 
              style={searchInputStyle}
            />
          </div>
          <button style={addButtonStyle}>
            <PlusCircle size={18} /> Add Patient
          </button>
        </header>
{/* PATIENT PAGE HEADER */}

{/* PATIENT CONTENT AREA */}
        <div style={{ padding: "32px", overflowY: "auto", flex: 1 }}>
          <div style={tableContainerStyle}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f1f5f9", background: "#f8fafc" }}>
                  <th style={thStyle}>First Name</th>
                  <th style={thStyle}>Last Name</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Email</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.id} style={trStyle}>
                    <td style={tdStyle}><strong>{patient.firstName}</strong></td>
                    <td style={tdStyle}>{patient.lastName}</td>
                    <td style={tdStyle}>{patient.phone}</td>
                    <td style={tdStyle}>{patient.email}</td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
                        <Eye size={18} style={{ color: "#049250", cursor: "pointer" }} />
                        <Pencil size={18} style={{ color: "#104dc0", cursor: "pointer" }} />
                        <Trash2 size={18} style={{ color: "#af1010", cursor: "pointer" }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
{/* PATIENT CONTENT AREA */}


    </>
  )};

const headerStyle = {
  height: "70px", background: "#fff", borderBottom: "1px solid #e2e8f0",
  display: "flex", alignItems: "center", padding: "0 32px", gap: "20px"
};

const searchInputStyle = {
  padding: "8px 12px 8px 40px", background: "#f1f5f9", border: "none",
  borderRadius: "8px", outline: "none", width: "100%", maxWidth: "400px", fontSize: "14px"
};

const searchIconStyle = { position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" };

const addButtonStyle = {
  background: "#3b82f6", color: "#fff", border: "none", padding: "8px 16px",
  borderRadius: "8px", display: "flex", alignItems: "center", gap: "8px",
  fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap"
};

const tableContainerStyle = { background: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0" };
const thStyle = { padding: "16px", fontSize: "13px", color: "#64748b", fontWeight: "600" };
const tdStyle = { padding: "16px", fontSize: "14px", color: "#1e293b" };
const trStyle = { borderBottom: "1px solid #f1f5f9" };
const statusBadgeStyle = { padding: "4px 10px", background: "#f0fdf4", color: "#166534", borderRadius: "6px", fontSize: "12px", fontWeight: "600" };

  export default Patients;
