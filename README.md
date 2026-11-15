# Forklift Safety & Pre-Check Management System

## GitHub upload
1. Open your GitHub repository.
2. Choose **Add file → Upload files**.
3. Extract this ZIP on your phone/computer first.
4. Upload the contents of this folder (not the ZIP itself) so `index.html` and `manifest.json` are in the repository root.
5. Commit the upload.

## Enable GitHub Pages
1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`, then Save.
4. Open the published Pages URL after deployment completes.

## App icon and install
- `icons/app-icon-192.png` and `icons/app-icon-512.png` are the app icons.
- The web app manifest and service worker are included for install support and same-origin app-shell caching.
- Installability requires HTTPS (GitHub Pages provides HTTPS).

## Important
The existing application logic and UI have been retained. The service worker caches the local app shell only. The application uses external CDN resources (Tailwind CSS, Google Fonts, Font Awesome and Chart.js), so full offline operation is not guaranteed.

## Important for Chrome installation
- Open the published **GitHub Pages HTTPS website**, not the `github.com` repository page.
- Wait until GitHub Pages deployment completes.
- On Android Chrome, open the Pages URL, then use Chrome menu → **Install app** (or **Add to Home screen**, depending on Chrome version).
- If an older version was installed, uninstall it, reload the Pages website, and install again after the new files are deployed.


## Repository layout used in this ZIP
The three PNG icon files are in the repository root, matching the existing GitHub upload. The HTML, manifest and service worker reference these root-level files.
