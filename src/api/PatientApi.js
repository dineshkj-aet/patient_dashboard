let PATIENT_SERVICE_BASE_URL = "http://localhost:8080/api/master/patients";

// Retrieve all patients with pagination API call
export async function fetchPatients(page = 0, limit = 6) {
  
  const res = await fetch(`${PATIENT_SERVICE_BASE_URL}?page=${page}&size=${limit}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw errorData; 
  }

  return res.json();
}

// Create new patient API call
export async function createPatient(patient) {
  const res = await fetch(PATIENT_SERVICE_BASE_URL, {
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

//Update existing patients API call
export async function updatePatient(patient) {
  const res = await fetch(`${PATIENT_SERVICE_BASE_URL}/${patient.id}`, {
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

// Delete patients  API call
export async function deletePatient(id) {
  const res = await fetch(`${PATIENT_SERVICE_BASE_URL}/${id}`, {
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