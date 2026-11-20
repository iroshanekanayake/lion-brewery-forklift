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

## v4: weekly forklift report + QR choice
- The app now opens on the **Inspection** screen (it used to open on the Dashboard). Bottom bar order: Inspect, Home, Weekly, Monthly, Settings.
- New **Weekly** screen: pick a forklift and a week (Monday to Friday). "Day report" shows one day on the phone (operator, supervisor, shift, time, hour meter, all 21 points, remarks). Day buttons Mon to Fri let the Safety Officer open earlier days of the week. "This week" shows the Mon to Fri grid of 21 checks, like the paper weekly sheet.
- **Print / PDF: this forklift** gives the one-page weekly sheet. **Office copy: all forklifts** gives a summary page plus one sheet for every forklift that was inspected that week. Give this to the office once a week (Friday evening or Monday morning).
- Scanning a forklift's QR (phone camera or the Scan QR button) now asks: **Today's report / This week's reports / New inspection (operator)**. Operators still reach the checklist with the third button.
- Week is Monday to Sunday (`WEEK_DAYS = 7` in index.html; use 5 for Mon to Fri). The weekly PDF prints in A4 landscape, one page per forklift.
- Service worker version is v12. Upload every file again and refresh once online so the phones update.

## v4.2
- Camera QR scanner has a **Flash** button (top right) for dark places and night shift. It appears only on phones whose browser allows the torch (most Android Chrome phones). On iPhones it is not offered by Safari; use the phone's own flashlight.
- Weekly > "Office copy: all forklifts" already makes ONE PDF for all forklifts (summary page + one landscape page per forklift that has an inspection that week). Choose "Save as PDF" in the print window.

## v4.3
- Defect photo buttons (Take photo / Gallery) removed from the inspection form. To bring them back set `PHOTOS_ENABLED = true` in index.html. Service worker v14.

## v5: Firebase sync (project lion-brewery-app)
- Every saved inspection is also sent to Firestore collection `logs`, and reports from other phones appear on this phone. The phone still saves first, so the app works offline and syncs when the internet returns.
- Small pill at top right: Synced / Syncing / Not synced / Sync problem. Tap it to see the reason and retry.
- Needed once in the Firebase console: create Firestore Database, enable Authentication > Sign-in method > Anonymous, paste FIRESTORE_RULES.txt into Firestore > Rules and Publish.
- Not synced yet: forklift list, operator/supervisor lists, settings, supervisor PIN (each phone keeps its own). Photos are off. Service worker v15.
