# Security Specification - PhysRPH+

## 1. Data Invariants
- A user profile (`users/{userId}`) can only be created by the authenticated user with that UID.
- `generationCount` starts at 0 and can only be incremented.
- `hasCompletedSurvey` can only transition from `false` to `true`.
- Survey responses (`surveys/{userId}`) can only be created once per user, and only by the owner.
- Aggregate stats (`stats/survey`) can only be updated by authenticated users (or possibly restricted further).
- All timestamps (`createdAt`, `updatedAt`) must be set using `request.time`.

## 2. The "Dirty Dozen" Payloads (Target: Denied)

### User Profile Attacks
1. **Identity Spoofing**: Create `users/attacker_uid` with `uid: 'victim_uid'`.
2. **Resource Poisoning**: Create `users/me` with a 2MB string in `email`.
3. **Privilege Escalation**: Update `users/me` with `generationCount: 0` (resetting limit).
4. **Temporal Manipulation**: Create `users/me` with a `createdAt` in the future.
5. **Shadow Fields**: Create `users/me` with an extra field `isAdmin: true`.

### Survey Attacks
6. **Data Injection**: Create `surveys/me` with a rating of 100 (range should be 1-5).
7. **Identity Theft**: Create `surveys/victim_uid` as an authenticated attacker.
8. **Malicious Query**: List ALL surveys at `/surveys/` without a UID filter.
9. **Update Hijack**: Update an existing survey response (should be immutable after creation).

### Stats Attacks
10. **Denial of Wallet**: Update `stats/survey` with `itemScores` containing 10,000 keys.
11. **Negative Score**: Update `stats/survey` with `itemScores.q1: -100`.
12. **Anonymous Vandalism**: Update `stats/survey` without being authenticated.

## 3. Test Runner
We will implement `firestore.rules.test.ts` to verify these. (Note: In this environment, we focus on the rules file themselves, but we follow the principles).
