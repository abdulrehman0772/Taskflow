TaskFlow - Modern Task Management Application

TaskFlow is a sleek, web-based task management application designed to help users organize their daily workflow efficiently. It features user authentication (Sign Up & Log In) and a full-featured To-Do dashboard with real-time editing, filtering, and task management capabilities connected to a mock database backend (db.json).

📸 Overview of Screens & Features

1. Sign-Up Page (/signup.html)

Purpose: Allows new users to create a TaskFlow account.

Fields: Full Name, Email, Password, Confirm Password.

Key Features & Validation:

Checks if the email already exists in db.json.

Verifies that passwords match and are at least 6 characters long.

Displays inline field-level validation errors in red.

Direct link to navigate to the Log In page.

2. Log-In Page (/login.html)

Purpose: Authenticates existing users to access their task dashboard.

Fields: Email, Password.

Key Features & Validation:

Validates credentials against recorded users in db.json.

Displays a top banner error (Invalid email or password) when authentication fails.

Direct link to navigate to the Sign Up page.

3. Task Dashboard (/index.html or /dashboard.html)

Header & User Profile:

Displays current user avatar initials and greeting (e.g., AR - Hi, Ahmed).

Includes a Log out button to end the session.

Adding Tasks:

Input Field & "Add task" Button: Allows users to create a new task item quickly.

Filtering:

Filter tabs for All, Active, and Completed tasks.

Item Status Counter:

Dynamically counts remaining uncompleted items (e.g., 3 items left).

4. Interactive Task Management & Inline Editing

Checkboxes: Toggle task completion (applies line-through visual styling to completed tasks).

Delete Button (Trash Icon): Permanently deletes a task from the list and database.

Inline Editing Mode:

Double-clicking a task activates inline edit mode.

Input Box: Pre-populated with existing task title.

Save Button: Commits the edited task text.

Cancel Button: Reverts changes without saving.

Keyboard Shortcuts: Press Enter to save or Esc to cancel.

🛠️ Project Structure

├── index.html          # Main Task Dashboard
├── login.html          # Login Interface
├── signup.html         # User Registration Interface
├── style.css           # Global Stylesheet (Custom CSS / Design System)
├── script.js           # Frontend Logic & Event Listeners
└── db.json             # Mock Database (Users & Tasks Data)


🚀 Getting Started

Prerequisites

A web browser (Chrome, Edge, Firefox, or Safari).

VS Code with the Live Server extension (or json-server installed via Node.js).

Running the Project

Clone or Download the Repository:

git clone https://github.com/abdulrehman0772/Taskflow.git  


Launch with Live Server:

Open the project folder in VS Code.

Right-click login.html or index.html and select "Open with Live Server".

(Optional) Run Mock REST API using json-server:
If using json-server to handle standard RESTful API requests (GET, POST, PUT, DELETE):

npm install -g json-server
npx json-server --watch db.json --port 3000


🔑 Demo Account Credentials

Use these pre-configured credentials in db.json for testing:

Email: ahmed@studio93.io

Password: password123

🎨 UI & Design Palette

Primary Dark Green: #265C47

Primary Hover Green: #1E4838

Background Tint: #F2F5F3

Error Red: #D9534F

Error Background: #FDF2F0