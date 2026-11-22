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

## v6
- Weekly report sheet (Print / PDF) now looks exactly like the company sample PDF: SN + checks grid, Mon-Sun day boxes (Operator, Supervisor, Shift, Time, Hour Meter), Remarks / Defect Details box, Safety Notes, and "Generated ... No signatures required" (no signature lines). The office-copy summary page also has no signature lines.
- Employee list: all names from the company list were already in the app. Settings now shows the position (Fork Lift Operator) under each operator, and supervisors show Forklift - Supervisor / Logistic Division. No ID numbers are stored. Service worker v16.

## v6.1
- Weekly PDF is forced to A4 landscape when printing; if a phone's print screen still uses portrait, the sheet shrinks to fit (nothing is cut off). Long check names no longer run into the Mon column. Service worker v17.

## v6.2
- Weekly sheet: "FORKLIFT OWNER" and "WEEK END" moved a little toward the middle (they now start in line with the Wed column). Page breaks are only placed between sheets, so a single sheet no longer produces a blank second page. Service worker v18.

## v6.3
- Home, Monthly and Settings (and its QR page) now need the supervisor PIN. Inspect and Weekly stay open for operators. The bottom navigation bar looks the same. The first person to tap one of the locked tabs creates the PIN, so the supervisor should do this first. Going back to Inspect or Weekly locks the PIN again. After sending an inspection the app stays on the Inspect screen.
- QR scanner: the Flash button is always shown while the camera is on (if the phone does not allow the browser to use the flash it says so). Service worker v19.

## v6.4
- Weekly > day card: new Edit button. It opens the record in the Inspect form (banner "Editing ...", button "Save Changes", Cancel). Operators can edit without a PIN during the same hours window as delete (Settings, default 24 h); older records ask for the supervisor PIN. The original record is kept (same id and submit time), marked as edited, and synced to the other phones. Service worker v20.

## v6.5
- Weekly screen: the "Day report / This week" switch was removed. The week table now opens by default; tap a day name to see that day (with the Edit button), and use the new "Week view" button there to go back. Service worker v21.

## v6.6
- Weekly screen: only the "Day report" button is removed. The day record card (all 21 checks, Edit and A4 buttons) shows by default again with the Mon-Sun day chips; the "This week" button switches to the week table and back. Service worker v22.

## v6.7
- "Office copy: all forklifts" no longer adds the summary page. The PDF now holds one full weekly sheet per forklift (one page each, same layout as the single-forklift sheet), for every forklift that has at least one inspection that week.
- Operator-only build support: set OPERATOR_ONLY = true at the top of the switchView code to hide Home / Monthly / Settings completely (see the separate operator zip). Service worker v23.

## v7: shared settings
- Forklifts, operators per department, supervisors, owners/models and the edit window are now shared through the cloud (document config/main). The newest change wins. The PIN is NOT shared (it stays on the supervisor's phone). The operator app only reads these settings.
- One-time Firebase step: Firestore Database > Rules > paste the new FIRESTORE_RULES.txt (it adds a "config" rule) > Publish.
- The first supervisor phone that opens this version with its saved settings uploads them; other phones then take them from the cloud.

## v7.1: this-shift status
- Home: the "Not checked this shift" box is now "This shift": every forklift as a chip, green = passed, red = failed, grey = not checked yet. Tap a grey chip to open the Inspect form with that forklift (and the current shift) selected; tap a green or red chip to see its record.
- Operator app: a third tab "Today" shows the same panel (plus a DO NOT OPERATE notice if a forklift is locked). Service worker v25.

## v8: Sinhala language
- Settings > Language: English / Sinhala. The choice is kept per phone only (it is not shared through the cloud), so one phone can be Sinhala while the others stay English. Changing it reloads the app once.
- Operator app: a fourth button "Language" in the bottom bar opens the same choice.
- The whole screen is translated (menus, forms, the 21 checks, messages, pop-ups). Names, forklift numbers and remarks written by people stay as typed. The printed/PDF weekly sheets, QR labels and CSV stay in English like the company sheet. Service worker v26.

## v8.1
- Home no longer asks for the supervisor PIN. Monthly and Settings (and its QR page) still do. In the operator app Home still does not exist. Service worker v27.

## v8.2
- Several forklifts can share one number (different company / fuel). Add them in Settings > Forklift Fleet: type the same number, choose the owner and model, press Add (it is saved as e.g. "FL 07 (Winwill, Gas)"). Each one has its own checks, weekly sheet, status chip and QR label.
- A plain "FL 07" that shares its number now shows its own owner and fuel too, e.g. "FL 07 (Tasma, Battery)", in the Inspect list, Weekly list, status chips, QR labels and the printed sheet. The saved name is unchanged, so old records are safe. Service worker v28.

## v8.3: Share PDF
- Weekly screen: two new buttons, "Share PDF: this forklift" and "Share PDF: all forklifts". They make the weekly sheet(s) as a PDF file (same layout as the printed sheet, A4 landscape, one page per forklift) and open the phone's share menu (WhatsApp, Gmail, Drive...). On a device without a share menu (e.g. a computer) the PDF is saved to Downloads. Service worker v29.

## v9: "Fleet Pro" look (new UI)
- A new look for the whole app: deep navy background with soft blue glow, glass panels, a sliding pill on the navigation bar (left rail on a laptop, bottom bar on a phone), blur page changes and number count-up on Home. It is only a visual skin: every button, form, rule and feature works exactly as before.
- It is now the default look. The old look is still there: Settings > Application Theme Preset > "Dark Coral (old look)" (the Sky and Corporate presets are unchanged).
- Printed/PDF sheets stay white and identical. Status bar colour changed to match (manifest theme colours). Service worker v30.

## v9.1: who can edit an inspection
- Every new inspection remembers which phone sent it. In the OPERATOR app the Edit button appears only on inspections sent from that same phone (and only within the edit window, Settings > delete hours, default 24 h). Other operators see "Only the operator who sent this can edit it." The main (supervisor) app can still edit every inspection (older than the window needs the PIN). Inspections sent before this version have no phone mark, so only the main app can edit them. Service worker v31.

## v9.2
- Inspect screen: the date and the shift now follow the clock by themselves (Day shift 6 am to 6 pm, Night shift 6 pm to 6 am; after midnight the night shift keeps the date it started on). They update when the screen opens, when the app is opened again and once a minute, until the person picks a date or shift by hand. The owner and model buttons also follow the selected forklift when the screen opens.
- A small label at the bottom of every page shows which app and version is running ("Operator app · v9.2" or "Main app · v9.2"), to check that a phone really has the update. Service worker v32.
