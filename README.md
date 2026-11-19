# Forklift Safety & Pre-Check Management System (v2)

Lion Brewery (Biyagama). A phone-friendly web app (PWA) for the daily 21-point forklift pre-check.

## Upload to GitHub Pages
1. Extract this ZIP on your phone or computer.
2. In the GitHub repository choose Add file > Upload files.
3. Upload every file (index.html, manifest.json, service-worker.js, README.md, lion-banner.jpg and the 6 PNG files) to the repository root. Replace the old ones.
4. Commit. Wait for the Pages deployment to finish, then open the https Pages link (not the github.com repository page).
5. Open the app online once, then refresh it once more. After that it also opens without internet.
6. If an older version is installed on a phone, remove the old home-screen icon and install again.

## What is new in v2
- Reports are saved on the device and survive closing the app. No demo data.
- Settings > Forklift Fleet: add any forklift number or name (single or a range, for example FL 31 to FL 75), set owner and model, remove units. The list is used everywhere: form, dashboard, reports, missed checks, QR labels.
- Supervisor PIN: needed to clear a defect, delete a report, remove a forklift, reset settings. A recovery code is shown once when the PIN is created.
- A wrongly saved report can be deleted within 24 hours (change the hours in Settings). After that it is locked.
- A Fail needs a remark. Fail items can have a photo (camera or gallery).
- Critical items (Horn, Safety belts, Brake check, Power steering, Hand brake) that Fail lock the forklift as DO NOT OPERATE until a supervisor clears it and records what was done. Edit `CRITICAL_ITEMS` in index.html to change the list.
- Dashboard: real daily/weekly/monthly numbers, real 7-day chart, Pass rate, list of forklifts not checked this shift.
- Report page (nav bar): monthly summary by owner and forklift, repeat problems, printable A4 / PDF.
- CSV export: one row per report, all 21 items as columns, opens in Excel with Sinhala text.
- QR labels (Settings > Forklift Fleet > Open QR label sheet): print, laminate and stick one on each forklift. Scanning opens the app with that forklift selected.
- Duplicate check (same forklift, date and shift), hour-meter warning when lower than the last reading, unique report IDs.

## Good to know
- Data lives in the browser of each phone or computer. Phones do not share data with each other or with a manager's laptop. Export a CSV regularly as a backup.
- Do not clear the browser's site data, or the saved reports are lost.
- The PIN keeps honest mistakes out. It is not strong security because the app has no server.
- To release an update, change `VERSION` in service-worker.js (for example "v6").


## v3 changes
- New header: Lion banner image with "LION BREWERY CEYLON PLC - Forklift Safety & Pre-Check" and the forklift logo. The old title bar was removed (on phones use the bottom bar; on laptops the menu sits under the banner).
- App icon, home-screen icon and favicon are now the forklift shield picture.
- Camera QR scanner: "Scan QR" on the Dashboard and "Scan forklift QR with camera" in the inspection form. It selects the forklift from its QR label. The camera needs the https link and camera permission. Phones without a built-in QR reader load a small helper (jsQR) once from the internet.
- Service worker version is v8. Remove the old home-screen icon and install again if the old icon still shows.

## v3.1 fixes
- Printing a report, QR labels or a single record sheet no longer shows the floating bottom bar.
- A single record sheet now prints once (before, the same sheet repeated on 3 pages).
- Saving: the app reconnects to the phone's storage if it was closed, retries once, and keeps a backup copy if it still fails. The warning now also shows the reason. Backed-up records move to the main store the next time the app opens.

## v3.2 fix
- "VersionError" when opening the app or saving: the browser already held a database with the same name at a newer version, so opening it as version 1 was refused. The app now opens the database at its existing version and adds the missing store if needed. Records kept in backup storage move over automatically.
