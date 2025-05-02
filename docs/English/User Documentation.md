# **User Documentation – CheckItOut Application**

CheckItOut is a simple and effective tool designed to help you organize daily tasks, manage them clearly, and build a consistent routine. Our goal is to support your productivity while allowing you to easily track your responsibilities.

### Why Choose CheckItOut?

- **Easy to Use** – A user-friendly interface that’s quick and simple to navigate.  
- **Customizable** – Create personalized lists, set reminders, and prioritize your tasks.  
- **Clarity** – Effortlessly track your tasks on a daily, weekly, or even monthly basis.  
- **Efficiency** – Helps you stay focused and organized throughout your day.

### How Does It Work?

1. **Create New Tasks** – Add your daily to-dos with a single click.  
2. **Set Deadlines and Reminders** – Never miss an important task again!  
3. **Define Priorities** – Rank your tasks based on their importance.  
4. **Mark Tasks as Complete** – Enjoy the satisfaction of progress as you move forward in an organized way.

CheckItOut helps you free up time for what really matters. Get started today and experience the benefits of effective time management!

**Try it now!**

## 1. Introduction

This documentation provides a detailed guide for using the CheckItOut web application. The app allows you to efficiently manage your daily tasks, projects, and customize your user profile.

## 2. General Structure

### 2.1 Header

- **Logo**: Located in the top-left corner, redirects to the homepage  
- **Navigation Menu**:  
    - *Home*: Returns to the main page  
    - *New Task*: Opens the task creation page  
    - *Profile*: Manage user information  
    - *Logout*: Ends the session  
- **Language Selector**: Top-right corner (English/Hungarian)

### 2.2 Footer

- **Contact**: Email address and physical address  
- **Documentation**: Link to this user guide  
- **Language Selector**  
- **Copyright**

## 3. Page-Specific Guide

### 3.1 Home Page (`/`)

**Purpose**: Introduce the app and guide the first steps

**Contents**:

1. **Introduction Section**  
    - Purpose of the application  
    - Key features  
2. **Feature Highlights**  
    - Task management  
    - Priority settings  
    - Categories  
3. **Registration/Login Buttons**  
4. **Contact Form**

**Usage**:

- Scroll down to explore all sections  
- Click “Register” to create a new account  
- Or “Login” to access your existing account

### 3.2 Registration (`/register`)

**Purpose**: Create a new user account

**Required Fields**:

1. **Full Name**  
    - Your real name  
    - Minimum 3 characters  
2. **Email Address**  
    - Valid format  
    - Must not already be registered  
3. **Password**  
    - At least 8 characters  
    - Recommended: mix of uppercase, lowercase, and numbers  
4. **Confirm Password**  
    - Must exactly match the password field

**Process**:

1. Fill in all fields  
2. Verify the input  
3. Click the “Register” button  
4. Upon success, you are automatically logged in and redirected to the homepage

**Note**: By registering, you accept the Terms of Service and Privacy Policy.

### 3.3 Login (`/login`)

**Purpose**: Sign in as an existing user

**Input Fields**:

1. **Email Address**: Provided during registration  
2. **Password**: Associated with your account

**Functions**:

- **Login**: Verify credentials and access the app  
- **Forgot Password**: Initiate password reset  
- **No account?**: Redirect to registration page

**Important**: After 5 failed attempts, a 15-minute lockout is enforced.

### 3.4 Password Reset (`/reset-password`)

**Purpose**: Reset a forgotten password

**Steps**:

1. Accessed via a link sent by email  
2. Email field is pre-filled  
3. Enter a new password (min. 8 characters)  
4. Confirm the password  
5. Click “Reset Password”

**After Success**: You are automatically logged in.

### 3.5 Main App Page (`/app/home`)

**Purpose**: Overview and manage tasks

**Key Areas**:

#### 3.5.1 Next Task

- Highest-priority task not yet started  
- If empty: “No next task” message

#### 3.5.2 Today’s Tasks

- All tasks scheduled for the current day  
- Displayed as cards:
    - Title  
    - Deadline  
    - Priority (indicated by stars)  
    - Category  
- If empty: “No tasks for today” message

#### 3.5.3 Completed Tasks

- Chronological list of completed tasks  
- Displayed in gray  
- If empty: “No completed tasks” message

**Actions**:

- Click a task to view details  
- On mobile: switch between tabs

### 3.6 Create New Task (`/app/newTask`)

**Purpose**: Add a new task

**Required Fields**:

1. **Title**  
    - Short name of the task  
    - Max 50 characters  
2. **Description**  
    - Detailed explanation  
    - Max 255 characters  
3. **Deadline**  
    - Date and time picker  
    - Must be a future date  
4. **Category**  
    - Dropdown from existing categories  
    - Use "+" button to add a new category  
5. **Priority**  
    - Scale from 1–10 (1 = lowest, 10 = highest)  
    - Default: 5

**Process**:

1. Fill in all fields  
2. Click “Create”  
3. On success, redirected back to home

### 3.7 Profile Management (`/app/profile`)

**Purpose**: Edit personal details

**Editable Fields**:

1. **Full Name**: Displayed name  
2. **Email Address**: Used for login

**Actions**:

- **Edit**: Enable fields for editing  
- **Save**:
    - Password confirmation required  
    - Confirmation modal appears  
- **Cancel**: Discard changes

**Security Note**: Changing your email will require re-login.

## 4. PWA Installation and Offline Use

### 4.1 Installation

1. **On Desktop**:  
    - Chrome: Click the install icon in the top-right corner  
    - Firefox: Use menu → “Install as app”  
2. **On Mobile**:  
    - Safari (iOS): Share → Add to Home Screen  
    - Chrome (Android): Menu → Install App

### 4.2 Offline Features

- View existing tasks  
- Create new tasks (synced once back online)  
- Edit profile data

### 4.3 Benefits

- Faster loading  
- Direct access from home screen  
- Push notifications (coming soon)
