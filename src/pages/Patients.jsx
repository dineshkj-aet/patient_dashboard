import React, { useState } from "react";
import {    PlusCircle,    Pencil,   Trash2,   Eye,   Search, XCircle,Save } from 'lucide-react';
import { useQuery,   useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPatients,createPatient,updatePatient } from "../api/PatientApi.js";


function Patients() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState(null); 
  const [sortOrder, setSortOrder] = useState("asc"); 
const [isEdit, setIsEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [page, setPage] = useState(0);
    const [formErrors, setFormErrors] = useState([]);

     const queryClient = useQueryClient();
  const limit = 10;

  const { data, isLoading, isError, error } = useQuery({
          queryKey: ["patients",page],
          queryFn: () => fetchPatients(page,limit),
          keepPreviousData: true,
  });

  const getProcessedPatients = () => {
  if (!data) return [];

  let patients = Array.isArray(data) ? data : data.content || [];
 
  if (search) {
    patients = patients.filter((p) =>
      p.firstName.toLowerCase().includes(search.toLowerCase()) ||
      p.lastName.toLowerCase().includes(search.toLowerCase()) 
    );
  }
 
  if (sortField) {
    patients = [...patients].sort((a, b) => {
      const valA = (a[sortField] || "").toString().toLowerCase();
      const valB = (b[sortField] || "").toString().toLowerCase();

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  return patients;
};

const displayedPatients = getProcessedPatients();


const handleSort = (field) => {
  if (sortField === field) {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  } else {
    setSortField(field);
    setSortOrder("asc");
  }
};

const getSortIcon = (field) => {
  if (sortField !== field) return "↕";
  return sortOrder === "asc" ? "🔼" : "🔽";
};
   
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address:"",
    city:"",
    state:"",
    zipCode:"",
    phoneNumber: "",
    email: "",
  });

    const openAdd = () => {
      setIsEdit(false);
      setForm({ firstName: "", lastName: "", address: "", city: "", state: "", zipCode: "", phoneNumber: "", email: "" });
      setIsOpen(true);
      setFormErrors([]); 
    };

    const handleSave = () => {
    if (!form.firstName.trim()) {
    setFormErrors(["First Name is required"]);
    return; 
  }  
  if (!form.lastName.trim()) {
    setFormErrors(["Last Name is required"]);
    return; 
  }
   if (!form.address.trim()) {
    setFormErrors(["Address is required"]);
    return; 
  }
   if (!form.city.trim()) {
    setFormErrors(["City is required"]);
    return; 
  }
  if (!form.phoneNumber.trim()) {
    setFormErrors(["Phone Number is required"]);
    return; 
  }
  if (!form.email.trim()) {
    setFormErrors(["Email is required"]);
    return; 
  }


  console.log("Saving patient...", form);
  
           if (isEdit) {
            updateMutation.mutate(form); 
          } else {
            createMutation.mutate(form); 
          }
};

  const createMutation = useMutation({
    mutationFn: createPatient,
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
      setIsOpen(false);
      setForm({ firstName: "", lastName: "", address: "", city: "", state: "", zipCode: "", phoneNumber: "", email: "" });
      setFormErrors([]);
    },
      onError: (error) => {
       console.log("API Error:", error);
      if (error?.errors) {
        const errorList = Object.values(error.errors);
        setFormErrors(errorList);
      } else {
        setFormErrors(["Something went wrong"]);
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatePatient,
   onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
      setIsOpen(false); 
      setForm({ firstName: "", lastName: "", address: "", city: "", state: "", zipCode: "", phoneNumber: "", email: "" });
    },
    onError: (error) => {
       console.log("API Error:", error);
      if (error?.errors) {
        const errorList = Object.values(error.errors);
        setFormErrors(errorList);
      } else {
        setFormErrors(["Something went wrong"]);
      }
    },
  });

  if (isLoading) return <p>Loading Patients...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <> 
{/* PATIENT PAGE HEADER */}
        <header style={headerStyle}>
          <div style={{ position: "relative", flex: 1 }}>
            <Search style={searchIconStyle} size={18} />
            <input 
             value={search}
            onChange={(e) => setSearch(e.target.value)}
              type="text" 
              placeholder="Search patients..." 
              style={searchInputStyle}
            />
          </div>
          <button onClick={openAdd} style={addButtonStyle}>
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
                  <th style={thStyle} onClick={() => handleSort("firstName")}>First Name{getSortIcon("firstName")}</th>
                  <th style={thStyle} onClick={() => handleSort("lastName")}>Last Name{getSortIcon("lastName")}</th>
                  <th style={thStyle} onClick={() => handleSort("city")}>City{getSortIcon("city")}</th>
                  
                  <th style={thStyle} >Phone</th>
                  <th style={thStyle} >Email</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedPatients.map((patient) => (
                  <tr key={patient.id} style={trStyle}>
                    <td style={tdStyle}><strong>{patient.firstName}</strong></td>
                    <td style={tdStyle} ><strong>{patient.lastName}</strong></td>
                    <td style={tdStyle} >{patient.city}</td>
                    <td style={tdStyle} >{patient.phoneNumber}</td>
                    <td style={tdStyle} >{patient.email}</td>
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

{/* PAGINATION CONTROLS */}
    <div
    style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#ffffff",
    padding: "12px 16px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  }}>
 
    <span style={{ fontSize: "14px", color: "#475569" }}>
      Page {page + 1}
    </span>

 
    <div style={{ display: "flex", gap: "10px" }}>
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 0))}
        disabled={page === 0}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          background: page === 0 ? "#f1f5f9" : "#ffffff",
          cursor: page === 0 ? "not-allowed" : "pointer",
        }}
      > Prev
      </button>

      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={page === data.totalPages - 1}
        style={{
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #e2e8f0",
          background: "#ffffff",
          cursor: "pointer",
        }}
      > Next
      </button>
    </div>

  </div>
{/* PAGINATION CONTROLS */}  
    


          </div>
        </div>
{/* PATIENT CONTENT AREA */}

  {/* ADD EDIT PATIENT */}
  {isOpen && (
   
   <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {/* Modal Box */}
      <div
        style={{
          width: "400px",
          background: "#fff",
          borderRadius: "10px",
          padding: "20px",
          position: "relative",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h3 style={{ margin: 0 }}> {isEdit ? "Modify Patient" : "Add Patient"}</h3>

          <XCircle
            size={20}
            style={{ cursor: "pointer" }}
            onClick={() => setIsOpen(false)}
          />
        </div>

            {/* Form Errors */}
            {formErrors.length > 0 && (
            <div style={formErrorStyle}>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
                {formErrors.map((err, index) => (
                  <li key={index} style={{ marginBottom: "2px",textAlign:"left" }}>
                    {err}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <input
            placeholder="First Name *"
            value={form.firstName}
            onChange={(e) => { 
      setForm({ ...form, firstName: e.target.value }); 
      setFormErrors([]); 
    }}
    style={{
      ...inputStyle,
      borderColor: formErrors.includes("First Name is required") ? "#ef4444" : "#e2e8f0",
      outline: "none"
    }}
      />
    
      <input
        placeholder="Last Name *"
        value={form.lastName}
        onChange={(e) => { 
      setForm({ ...form, lastName: e.target.value }); 
      setFormErrors([]); 
    }}
    style={{
      ...inputStyle,
      borderColor: formErrors.includes("Last Name is required") ? "#ef4444" : "#e2e8f0",
      outline: "none"
    }}
      />
      
      <input
        placeholder="Address *"
        value={form.address}
         onChange={(e) => { 
      setForm({ ...form, address: e.target.value }); 
      setFormErrors([]); 
    }}
    style={{
      ...inputStyle,
      borderColor: formErrors.includes("Address is required") ? "#ef4444" : "#e2e8f0",
      outline: "none"
    }}
      />
      <input
        placeholder="City *"
        value={form.city}
         onChange={(e) => { 
      setForm({ ...form, city: e.target.value }); 
      setFormErrors([]); 
    }}
    style={{
      ...inputStyle,
      borderColor: formErrors.includes("City is required") ? "#ef4444" : "#e2e8f0",
      outline: "none"
    }}
      />
      <input
        placeholder="State"
        value={form.state}
        onChange={(e) => { setForm({ ...form, state: e.target.value }); setFormErrors([]); }}
        style={inputStyle}
      />
      <input
        placeholder="Zip Code"
        value={form.zipCode}
        onChange={(e) => { setForm({ ...form, zipCode: e.target.value }); setFormErrors([]); }}
        style={inputStyle}
      />
      <input
        placeholder="Phone Number *"
        value={form.phoneNumber}
       onChange={(e) => { 
      setForm({ ...form, phoneNumber: e.target.value }); 
      setFormErrors([]); 
    }}
    style={{
      ...inputStyle,
      borderColor: formErrors.includes("Phone Number is required") ? "#ef4444" : "#e2e8f0",
      outline: "none"
    }}
      />
        <input
        placeholder="Email *"
        value={form.email}
       onChange={(e) => { 
      setForm({ ...form, email: e.target.value }); 
      setFormErrors([]); 
    }}
    style={{
      ...inputStyle,
      borderColor: formErrors.includes("Email is required") ? "#ef4444" : "#e2e8f0",
      outline: "none"
    }}
      />
        </div>

        {/* Footer Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => setIsOpen(false)}
            style={cancelBtn}
          >
            Cancel
          </button>

          <button
           onClick={() => {
            handleSave();
        }}
          style={saveBtn}
          >
            <Save size={16} />
            Save
          </button>
        </div>
      </div>
    </div>
  )}
  {/* ADD EDIT PATIENT */}

    </>
  )};

  const formErrorStyle = {
      background: "#fee2e2",
      color: "#b91c1c",
      padding: "8px",
      borderRadius: "6px",
      marginBottom: "10px",
      fontSize: "14px",
    }

   const inputStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ddd",
  };

  const cancelBtn = {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
  };

  const saveBtn = {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#1e293b",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  };

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

  export default Patients;
