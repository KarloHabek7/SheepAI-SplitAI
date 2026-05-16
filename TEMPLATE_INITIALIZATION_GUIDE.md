# Project Template Initialization Guide

> **Quick Start Guide** — *Follow these steps to copy, initialize, and set up a new project using this template.*

---

## Overview

This guide explains how to properly duplicate this pre-configured project template into a new, independent project directory and initialize it as a fresh Git repository. 

This project template is fully equipped with:
- **`app/`**: A pre-configured React 19 + TypeScript + Vite + Tailwind CSS development environment.
- **`.agents/`**: Core Antigravity automated slash-command agent workflows.
- **`Development_plans/`**: Plan and task templates for parallelized lane development.

---

## Step-by-Step Initialization

> [!TIP]
> **🚀 Automated Option (Fastest):**
> You can fully automate this entire process using our custom agent workflows! 
> 1. In the configuration repository, run the **`/initialize-project`** workflow in the Antigravity Agent chat and provide this destination folder path (e.g., `C:\Users\Karlo Habek\Desktop\Hackatlon\Test_project`). The agent will copy all files (including hidden ones), initialize Git, and commit the boilerplate for you.
> 2. Open the new target folder in the Google Antigravity IDE and run the **`/setup`** workflow in the chat to automatically copy environment variables, install dependencies, and create your development lane branch!

### Manual Option

If you prefer to perform the steps manually, follow the instructions below:

### Step 1: Copy the Template to a New Folder

To ensure your new project is fully functional, you must copy **all** files—including hidden configuration files (such as `.gitignore` and directories starting with `.`).

Choose one of the methods below based on your operating system and environment.

#### Option A: Using Windows PowerShell (Recommended)
Open PowerShell and run the following commands to create your new project directory, copy the template, unblock files, and touch the `.agents/` folder timestamps so they are instantly indexed by the IDE:

```powershell
# 1. Create your new target project directory (adjust the path as needed)
New-Item -ItemType Directory -Path "C:\Users\Karlo Habek\Desktop\Hackatlon\MyNewProject"

# 2. Copy all template files (including hidden ones) into your new directory
Copy-Item -Path "c:\Users\Karlo Habek\Desktop\Hackatlon\Project_configuration\Output\project_template\*" -Destination "C:\Users\Karlo Habek\Desktop\Hackatlon\MyNewProject" -Recurse -Force

# 3. Unblock all files (bypasses Windows security restrictions on copied files)
Get-ChildItem -Path "C:\Users\Karlo Habek\Desktop\Hackatlon\MyNewProject" -Recurse -Force -ErrorAction SilentlyContinue | Unblock-File

# 4. Touch all files in .agents/ (forces Antigravity to index the rules & workflows instantly)
Get-ChildItem -Path "C:\Users\Karlo Habek\Desktop\Hackatlon\MyNewProject\.agents" -Recurse -Force -ErrorAction SilentlyContinue | ForEach-Object {
    $_.LastWriteTime = Get-Date
    if ($_ -is [System.IO.FileInfo]) {
        $_.CreationTime = Get-Date
    }
}
```

#### Option B: Using Bash / Zsh (macOS or Linux)
Open your terminal and run:

```bash
# 1. Create your new target project directory
mkdir -p ~/Desktop/Hackatlon/MyNewProject

# 2. Copy all template files (including hidden ones, note the trailing dot ".")
cp -r "c/Users/Karlo Habek/Desktop/Hackatlon/Project_configuration/Output/project_template/." ~/Desktop/Hackatlon/MyNewProject/

# 3. Touch all files in .agents/ to trigger immediate indexing in the IDE
find ~/Desktop/Hackatlon/MyNewProject/.agents/ -type f -exec touch {} +
```

#### Option C: Using Windows File Explorer
1. Open this source template directory in File Explorer.
2. **Crucial:** Ensure hidden files are visible. In File Explorer, click **View** -> **Show** -> check **Hidden items**.
3. Select everything in the directory (`Ctrl + A`) and copy it (`Ctrl + C`).
4. Navigate to your new project folder and paste the files (`Ctrl + V`).

---

### Step 2: Initialize a New Git Repository

Once the files are in your new folder, you must initialize a new Git repository. This dissociates the new project from the configuration repository.

Open your terminal (PowerShell or Bash) in the **new project directory** and run:

```bash
# 1. Initialize a new local Git repository
git init

# 2. (Optional) Force the default branch to be named 'main'
git branch -M main

# 3. Stage all template files (including hidden ones)
git add -A

# 4. Commit the initial boilerplate structure
git commit -m "chore(config): initialize project from template scaffolding"
```

---

### Step 3: Link to Your Remote Repository

To store your code in GitHub or another remote hosting provider, link your local repository to a remote origin:

```bash
# 1. Add your new remote repository URL
git remote add origin <your-new-repository-url>

# 2. Push the initial commit to the main branch
git push -u origin main
```

---

### Step 4: Configure the Local Environment

With the repository initialized, set up your local development environment using these three steps:

#### 1. Copy the Environment Template
Run the following in the root of your new project directory:
```bash
cp .env.example .env
```
> [!NOTE]
> Open the new `.env` file and populate any required API keys or configurations.

#### 2. Install NPM Packages
Navigate into the `app` directory and install dependencies:
```bash
cd app
npm install
```

#### 3. Start the Development Server
Run the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to verify that the application loads and runs correctly.

---

## 👥 Onboarding Team Members (Cloning/Pulling from Git)

When other team members clone or pull the repository from Git on their laptops, they should run our simple local environment initializer script. This unblocks files and "touches" the `.agents/` folder, ensuring their local Google Antigravity IDE immediately indexes and recognizes all rules and workflows:

### For Windows Users (PowerShell):
Open PowerShell in the project root and run:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\init-local.ps1
```

### For macOS / Linux Users (Bash):
Open your terminal in the project root and run:
```bash
chmod +x init-local.sh
./init-local.sh
```

These scripts will:
1. **Unblock files** (critical on Windows to remove download security blocks/restrictions).
2. **Touch all files in `.agents/`**, resetting their timestamps to the current time to force-trigger the IDE's file system watcher and make the rules and slash commands visible instantly.
3. Create the local `.env` file automatically.

Once initialized, open the root folder in Google Antigravity IDE and run the **`/setup`** workflow in the agent chat to configure your development branch and lane rules!

---

## Important Best Practices

> [!WARNING]
> **Check Hidden Files:** Always verify that hidden folders like `.agents/` and hidden files like `.gitignore` are present in the root of your new project folder before starting work. Without these, your Antigravity Agent will not function!

> [!TIP]
> **Workspace Root:** Always open the **root** of your new project folder in Google Antigravity IDE (not the `app` subdirectory). This ensures that the agent correctly parses project rules and workflows.
