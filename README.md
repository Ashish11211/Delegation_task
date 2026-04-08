# 📋 Task Management System (Google Apps Script)

## 🚀 Overview

This project is a **Task Tracking and Revision Management System** built using Google Apps Script and Google Sheets. It helps manage daily tasks, track revisions, and monitor pending work efficiently.

---

## ✨ Features

* Add new tasks
* Track task revisions (max 2 per week)
* Automatic week shift handling
* Fetch pending and overdue tasks
* Mark tasks as completed
* Dashboard summary with archive system
* Doer (employee) list integration

---

## 📂 Sheet Structure

### 1. Master Sheet

Stores all task data.

Columns:

* Task ID
* Name
* Task
* First Date
* Latest Revision
* Total Revisions
* Revision 1
* Revision 2
* Status

---

### 2. Dashboard Sheet

Shows weekly performance:

* Pending tasks
* Completed tasks
* Status indicators (Red, Yellow, Green)

---

### 3. Archive Sheet

Stores weekly summary:

* Name
* Week
* Pending (Red/Yellow/Green)
* Achieved (Red/Yellow/Green)

---

### 4. Doer List Sheet

Contains list of task owners.

---

## ⚙️ Functions

### addNew(options)

Adds a new task.

Example:
{
name: "Akash",
task: "Follow up with client",
fdate: "01/04/2026"
}

---

### addNext(options)

Adds next revision:

* Max 2 revisions allowed per week
* If exceeded → new task created automatically

---

### fetch()

Returns overdue pending tasks.

---

### fetchAllPendings()

Returns all pending tasks sorted by date.

---

### taskComplete(taskID)

Marks a task as Completed.

---

### fetchRelevantData()

Returns overdue task data (UI friendly).

---

### fetchAllPendingData()

Returns all pending tasks in simple format.

---

### getInfoByTaskID(taskID)

Returns task details by Task ID.

---

### getAllDoers()

Returns employee list from Doer Sheet.

---

### archive()

Stores dashboard weekly data into Archive.

---

## 🧠 Logic

* Each task allows **maximum 2 revisions per week**
* If:

  * Revision exceeds limit OR
  * Week changes
    → New task is created
* Task Status:

  * Pending
  * Completed
  * Week Shifted

---

## 🛠️ Tech Stack

* Google Apps Script
* Google Sheets

---

## 📌 Setup

1. Create Google Sheet
2. Add sheets:

   * Master
   * Dashboard
   * Archive
   * Doer List
3. Paste script into Apps Script editor
4. Run functions

---

## ⚠️ Notes

* Date format: DD/MM/YYYY
* Do not change column order
* Ensure ManagedSpreadsheet class is available

---

## 🔮 Future Improvements

* Web dashboard UI
* Email/WhatsApp alerts
* Automation triggers
* Role-based access

---

## 📷 Screenshot
<img width="930" height="652" alt="image" src="https://github.com/user-attachments/assets/17e186d9-b28d-4f8c-b029-a98675e16f3d" />
<img width="707" height="915" alt="image" src="https://github.com/user-attachments/assets/eadc1c64-4de9-4bb4-b7c8-40eb94550441" />
<img width="1508" height="962" alt="image" src="https://github.com/user-attachments/assets/fb60a4db-4a8c-4699-9f8e-f7e4348474c7" />


---

## ⚠️ Note
This project uses **dummy/modified data** for portfolio purposes. No confidential company data is shared.

---

## 📫 Contact
- Name: Ashish Ranjan 
- 📧 Email: ashishranjan11211@gmail.com  
- 🔗 LinkedIn: linkedin.com/in/ashishranjanji09

---

⭐ If you like this project, give it a star!
