## 🖥️ Patient Application Screenshots

### 📊 Main Dashboard

**URL:** http://localhost:5173/dashboard

The dashboard consists of:

- A **left-side navigation menu**
- A **central panel** displaying a data grid

#### 🔍 Grid Features

- **Search** by _First Name_ and _Last Name_  
  _(Client-side search — no API calls involved)_
- **Sorting** (ascending/descending) by:
  - First Name
  - Last Name
  - City  
    _(Client-side sorting — no API calls involved)_
- **Pagination**
  - Supports page navigation
  - Allows users to change page size (items per page)

#### ⚙️ Actions Available

- **View** – Displays full details of the patient
- **Edit** – Opens the edit modal with patient details
- **Delete** – Shows a confirmation dialog and performs a hard delete upon confirmation

---

### 🖼️ Dashboard View

<img src="screenshots/Dashboard.png" width="600"/>

### 📱 Dashboard – Responsive Layout

<img src="screenshots/Dashboard_responsive.png" width="600"/>

### 🖼️ Grid View - Responsive Layout

## <img src="screenshots/grid_view_responsive.png" width="600"/>

## ➕ Add Patient

- Client-side validation is applied to required fields
- Displays validation error messages for:
  - Client-side validation
  - Server-side validation
  - Server-side error responses

### 🖼️ Add Patient

<img src="screenshots/Add-Patient.png" width="600"/>

### 📱 Add Patient – Responsive Layout

<img src="screenshots/Add-Patient_responsive.png" width="600"/>

---

## ✏️ Edit Patient

- Same validations as the **Add Patient** screen are applied

### 🖼️ Edit Patient

<img src="screenshots/Edit_Patient.png" width="600"/>

### 📱 Edit Patient – Responsive Layout

<img src="screenshots/Edit_Patient_responsive.png" width="600"/>

---

## 🗑️ Delete Patient

- Before deleting, a **confirmation dialog** is displayed with the patient’s name
- Clicking **Delete** will permanently remove the patient from the database
- Clicking **Cancel** will return to the grid without any changes

### 🖼️ Delete Patient

<img src="screenshots/Delete_patient.png" width="600"/>
