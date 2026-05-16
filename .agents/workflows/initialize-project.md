---
description: Copy the project template to a new directory and initialize a new Git repository.
---

# Project Initialization Workflow (`/initialize-project`)

You are now acting as the **Project Initializer**. Your goal is to automate the copying and initialization of a new project from the `Output/project_template` directory to a path specified by the user.

## Instructions

1. **Get the Target Path:**
   - Look at the user's message for the target folder path (e.g., `C:\Users\Karlo Habek\Desktop\Hackatlon\Test_project`).
   - If no target path is provided, stop and ask the user: *"Please specify the target folder path where you want to copy and initialize the new project."*

2. **Validate Path & Directory:**
   - Ensure the target path is valid.
   - If the directory does not exist, use PowerShell to create it.
   - If the directory already exists and is not empty, warn the user and ask for confirmation before proceeding.

3. **Write and Execute PowerShell Script:**
   - To avoid Windows PowerShell command-line quoting and escaping issues, always use a PowerShell script file (`init_project_temp.ps1`) in the workspace.
   - **If `init_project_temp.ps1` is already present in the workspace:** Read the file, update the `$targetPath = "..."` variable (on line 1) to match the requested target folder path, save the file, and execute it.
   - **If `init_project_temp.ps1` is NOT present:** Create the file `init_project_temp.ps1` with the following content (replacing `TARGET_PATH` with the actual path):
     ```powershell
     $targetPath = "TARGET_PATH"

     Write-Host "1. Copying template files..."
     Copy-Item -Path "Output\project_template\*" -Destination $targetPath -Recurse -Force

     Write-Host "2. Renaming rules with underscores to hyphens..."
     Get-ChildItem -Path "$targetPath\.agents\rules\*_*.*" -Recurse -ErrorAction SilentlyContinue | ForEach-Object {
         $newName = $_.Name -replace '_', '-'
         Rename-Item -Path $_.FullName -NewName $newName -Force
     }

     Write-Host "3. Unblocking files..."
     Get-ChildItem -Path $targetPath -Recurse -Force -ErrorAction SilentlyContinue | Unblock-File

     Write-Host "4. Touching .agents files to force index watcher update..."
     Get-ChildItem -Path "$targetPath\.agents" -Recurse -Force -ErrorAction SilentlyContinue | ForEach-Object {
         $_.LastWriteTime = Get-Date
         if ($_ -is [System.IO.FileInfo]) {
             $_.CreationTime = Get-Date
         }
     }

     Write-Host "5. Initializing Git repository..."
     Set-Location -Path $targetPath
     git init
     git branch -M main
     git add -A
     git commit -m "chore(config): initialize project from template scaffolding"

     Write-Host "Project initialization complete!"
     ```
   - Execute the generated script file in the workspace:
     ```powershell
     powershell -ExecutionPolicy Bypass -File .\init_project_temp.ps1
     ```

5. **Guide the User on Next Steps:**
   - Once successfully copied and initialized, guide the user on:
     - How to open the new project root folder in **Google Antigravity IDE**.
     - How to set up their remote origin with:
       ```bash
       git remote add origin <your-new-repository-url>
       git push -u origin main
       ```
     - How to call the **`/setup`** workflow inside the new project to complete the environment setup.
