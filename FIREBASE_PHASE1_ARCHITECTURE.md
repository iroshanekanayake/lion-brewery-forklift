# Forklift QR Report Viewer — Phase 1 Architecture

## Confirmed scope
- Use the existing Firebase project (project configuration still needs to be supplied/verified).
- Public, read-only QR report access.
- Report history per forklift, newest first, with date filtering.
- Remove only the Daily A4 Print / Save PDF interface. Weekly PDF, Monthly PDF, QR label printing, CSV export and all inspection workflows remain.
- Preserve the current IndexedDB (`forklift_logs_db`) and Local Storage (`forklift_config_v2`) data. No automatic migration or deletion is performed in Phase 1.

## Current application baseline (source ZIP inspection)
- Single-page vanilla HTML application (`index.html`).
- Inspection records are stored in IndexedDB database `forklift_logs_db`, object stores `logs` and `weekly`.
- Fleet, app settings and employee directory are stored under Local Storage key `forklift_config_v2`.
- Defect photos are stored separately in IndexedDB database `forklift_photos_v1`.
- QR labels currently encode the `?fl=` deep link; that flow selects a forklift and opens the inspection form.
- There is no Firebase SDK/configuration or cloud sync implementation in the supplied ZIP.

## Target architecture
1. Existing management app remains the trusted write interface.
2. Staff authentication is required for cloud writes. The existing supervisor PIN is a local UI gate, not cloud identity; it must not be treated as Firebase authentication.
3. A migration/sync service validates and uploads existing inspection records without deleting local originals.
4. A public QR token resolves to one forklift's public report projection. Use a cryptographically random token, not a sequential forklift number as an authorization token.
5. Public projection contains only approved inspection fields. Exclude staff-only settings, employee directory, local PIN/recovery material, and unrelated fleet data.
6. Public viewer can read history only. No public create/update/delete permissions.
7. Firestore rules start deny-all until project IDs, authentication provider, staff roles and collection paths are reviewed and configured.

## Proposed Firestore collections
- `staffUsers/{uid}` — staff role and active status; writable only by trusted administrators.
- `forklifts/{forkliftId}` — private fleet master data and QR token mapping; staff-only access.
- `inspections/{inspectionId}` — canonical inspection records; staff-only read/write.
- `publicQrTokens/{token}` — minimal public token-to-forklift mapping; public read by exact token only, staff-only write.
- `publicForkliftReports/{forkliftId}/records/{inspectionId}` — sanitized, immutable public report projections; public read, staff-only create/update/delete.

The exact rules and document fields must be finalized against the existing Firebase project and chosen staff authentication model before enabling public access. Do not publish a ruleset that grants broad collection reads.

## Migration safety
- Export a full CSV backup before migration and retain an untouched copy of the original ZIP.
- Use stable inspection IDs as Firestore document IDs to make retries idempotent.
- Verify counts, IDs, dates, forklift numbers and checklist results after import.
- Keep IndexedDB originals until a separate, explicitly approved cleanup phase (not included here).
- Handle photos separately; the current photos are local IndexedDB blobs/keys and are not automatically cloud accessible.

## Phase 1 deliverables in this ZIP
- Removed the Daily A4 Print / Save PDF modal and its per-record "View Sheet" action only.
- Added this architecture and migration plan.
- Added a deny-all Firestore rules starter and Firebase setup checklist.
- No Firebase project configuration, data migration, public QR route, or cloud sync is enabled yet. This is intentional: the ZIP contains no Firebase project ID/config or verified staff-auth setup, and enabling public reads before those are known would expose data.

## Required inputs before Phase 2 implementation
- Firebase web app configuration for the existing project (API key, auth domain, project ID, app ID; do not send service-account private keys).
- Confirmation of the authentication provider and the staff/admin role assignment method.
- Confirmation of which report fields may be public (operator and supervisor names are currently included in the daily report and need explicit approval for public disclosure).
