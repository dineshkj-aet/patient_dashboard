export async function fetchPatients(page = 0, limit = 6) {
  
  const res = await fetch(`http://localhost:8080/api/master/patients?page=${page}&size=${limit}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData; 
  }

  return res.json();
}

export async function createPatient(patient) {
  const res = await fetch("http://localhost:8080/api/master/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData; 
  }
}

export async function updatePatient(patient) {
  const res = await fetch(`http://localhost:8080/api/master/patients/${patient.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData; 
  }

  return res.json();
}

export async function deletePatient(id) {
  const res = await fetch(`http://localhost:8080/api/master/patients/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData; 
  }

  return res.json();
}