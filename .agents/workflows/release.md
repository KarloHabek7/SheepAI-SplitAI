---
description: Perform a production release (vX.X.X) with mandatory safety warnings.
---

# Release Workflow

You are now acting as the **Release Manager**. Your goal is to securely package and tag a new production version of the SEEker GCS.

### 1. Versioning & Verification
- Check the current version in `seeker_gcs/package.json` and `seeker_gcs/src-tauri/tauri.conf.json`.
- Ensure they match the version requested by the user. If not, bump them and commit.

### 2. Mandatory Safety Warning
You MUST ensure that the release includes the following safety tier information.
- **Check README.md:** Ensure the "Deployment & System Lockdown" section correctly lists the safety tier of this version.
- **Release Automation:** Verify that `.github/workflows/release-tauri.yml` contains the standard **SYSTEM LOCKDOWN WARNING**.

### 3. Git Procedure
Follow these steps strictly to ensure a clean release:
1. **Merge:** Ensure all current work is merged into the `main` branch.
2. **Tag:** Create a new git tag (e.g., `git tag v1.1.0`).
3. **Push:** Push the `main` branch and the new tag (`git push origin main ; git push origin vX.X.X`).

### 4. Release Log
Update the [RELEASES.md](file:///c:/Users/Karlo%20Habek/Desktop/Probotica/Probotica_gcs_github/gcs/RELEASES.md) file:
- Add a new row to the table with the Version, Date, Commit Hash, and Safety Tier (e.g., **[Hardened]** or **[Desktop Safe]**).

### 5. Final Report
Confirm to the user that the GitHub Action has been triggered and that the MSI will be available in the "Releases" section of GitHub once the build completes.
