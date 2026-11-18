# Existing Firebase Project — Phase 2 Setup Checklist

Do not paste or commit a service-account JSON file or private key into this repository.

Before enabling the QR viewer:

1. In Firebase Console, open the existing project and register/confirm its Web App.
2. Provide the Web App configuration values only (apiKey, authDomain, projectId, appId, and measurementId only if Analytics is used). Firebase web config is not a service-account secret, but Firestore Security Rules and Authentication still provide actual access control.
3. Confirm the staff authentication provider (Firebase Authentication) and how administrator/staff roles will be assigned.
4. Approve which fields are visible to anyone holding/scanning the forklift QR label. Recommended default: forklift number, inspection date/time, shift, hour meter, checklist statuses, defect remarks and approved defect photos. Operator/supervisor names should remain hidden unless explicitly approved.
5. Configure Firestore indexes and least-privilege rules for the exact collections in `FIREBASE_PHASE1_ARCHITECTURE.md`.
6. Test with Firebase Emulator Suite or a non-production test project before production deployment.
7. Only after rules tests pass, enable QR token provisioning and public report projection writes.

## Never do these
- Never put service-account credentials in browser JavaScript.
- Never allow unauthenticated public writes.
- Never expose the entire private inspection collection to public reads.
- Never use `?fl=FL01` or another predictable unit identifier as the public access token.
- Never delete local IndexedDB records as part of cloud migration.
