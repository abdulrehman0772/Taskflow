# TaskFlow - Modern Task Management Application

TaskFlow is a sleek, web-based task management application designed to help users organize their daily workflow efficiently. It features user authentication (Sign Up & Log In) and an interactive To-Do dashboard with task creation, deletion, inline editing, filtering, and task completion capabilities connected to a mock database backend (`db.json`) using JSON Server.

## 📸 Overview of Screens & Features

### 1. Sign-Up Page (`/signup.html`)

**Purpose:** Allows new users to create a TaskFlow account.

**Fields:** Full Name, Email, Password, Confirm Password.

**Key Features & Validation:**
- Checks if the email already exists in `db.json`.
- Verifies that passwords match and are at least 6 characters long.
- Displays inline field-level validation errors in red.
- Provides a direct link to navigate to the Log In page.

### 2. Log-In Page (`/index.html` or `/login.html`)

**Purpose:** Authenticates existing users to access their task dashboard.

**Fields:** Email, Password.

**Key Features & Validation:**
- Validates credentials against registered users in `db.json`.
- Displays a top banner error (`Invalid email or password`) when authentication fails.
- Redirects authenticated users to the task dashboard.
- Provides a direct link to navigate to the Sign Up page.

### 3. Task Dashboard (`/empty-task.html`)

**Purpose:** Allows logged-in users to manage their daily tasks from one place.

**Header & User Profile:**
- Displays the current user's avatar initials and personalized greeting (e.g., `AR - Hi, Ahmed`).
- Includes a Log Out button to end the current session.

**Adding Tasks:**
- Provides a task input field and an Add Task button.
- Allows users to create and add new tasks to their task list.
- Saves newly created tasks to `db.json` through JSON Server.

**Task Filtering:**

Three functional filter buttons help users organize their tasks:

- **All:** Displays all tasks, including completed and incomplete tasks.
- **Active:** Displays only incomplete or pending tasks.
- **Completed:** Displays only tasks marked as completed.

**Task Status Counter:**
- Dynamically displays the number of remaining incomplete tasks (e.g., `3 items left`).
- Updates automatically when tasks are added, completed, or deleted.

### 4. Interactive Task Management

The TaskFlow dashboard provides the following task management features:

**Checkboxes:**
- Allows users to mark tasks as completed or incomplete.
- Applies line-through styling to completed tasks.
- Updates task completion status in `db.json`.

**Delete Task:**
- Includes a Delete button with a trash icon.
- Permanently removes the selected task from the task list and `db.json`.

**Inline Task Editing:**
- Allows users to edit an existing task by double-clicking its title.
- Displays an input field pre-filled with the current task title.
- Provides a Save button to update and save edited task details.
- Provides a Cancel button to discard changes and restore the original title.
- Supports keyboard shortcuts:
  - `Enter` to save changes.
  - `Esc` to cancel editing.

**Real-Time Task Updates:**
- Updates the dashboard after adding, editing, deleting, or completing tasks.
- Keeps task information synchronized with the JSON Server backend.

### 5. Project Structure

```text
TaskFlow/
│
├── index.html                  # Login Interface
├── signup.html                 # User Registration Interface
├── empty-task.html              # Main Task Management Dashboard
├── dashboard.html               # Task Dashboard UI Design
├── dashboard2.html              # Task Editing UI Design
│
├── style.css                    # Main Stylesheet
├── dashboard-stylesheet.css     # Dashboard Stylesheet
├── edit-dashboard.css           # Editing Dashboard Styles
├── empty-stylesheet.css         # Main Task Dashboard Styles
│
├── script.js                    # Login/Authentication Logic
├── make-task.js                 # Task Management Logic
│
└── db.json                      # Mock Database (Users & Tasks)
```

### 6. Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- JSON Server (Mock REST API)
- Local Storage (User Session Management)
- Visual Studio Code
- Live Server

### 🚀 Getting Started

**Prerequisites**

- A modern web browser (Chrome, Edge, Firefox, or Safari).
- Visual Studio Code.
- Node.js and npm.
- Live Server extension.
- JSON Server.

**Running the Project**

**Step 1: Open the Project**

Open the TaskFlow project folder in VS Code.

**Step 2: Launch Live Server**

Right-click `index.html` or `login.html` and select **Open with Live Server**.

**Step 3: Start JSON Server**

Open the VS Code terminal and run:

```bash
npx json-server --watch db.json --port 3000
```

The API will be available at:

```text
http://localhost:3000
```

### 🔑 Demo Account Credentials

Use these pre-configured credentials from `db.json`:

- **Email:** ahmed@gmail.com
- **Password:** 123456

### 🎨 UI & Design Palette

| Element | Color |
|---|---|
| Primary Dark Green | `#265C47` |
| Primary Hover Green | `#1E4838` |
| Background Tint | `#F2F5F3` |
| Error Red | `#D9534F` |
| Error Background | `#FDF2F0` |

### 📌 Key Highlights

- User Registration and Authentication.
- Personalized Task Management Dashboard.
- Add, Edit, and Delete Tasks.
- Mark Tasks as Completed or Active.
- Functional All, Active, and Completed Filters.
- Dynamic Remaining Task Counter.
- Inline Editing with Save and Cancel options.
- Keyboard Support for Editing.
- JSON Server Integration for Data Management.