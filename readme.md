# INSTRUCTION

## Prerequisites
- node.js (https://nodejs.org/en/blog/release/v18.18.0)
- yarn (https://yarnpkg.com/)
- stable internet connection
- stable computer and power source

## Step-by-step guide
1. Install dependencies: `yarn install`.
2. Create .env file from the template `cp .env.example .env`.
3. Fill database configurations in the .env file.
4. Create a backup of the target database.
5. Back up current hash of administrator's password. Run this query on target database: `SELECT password FROM users WHERE email="admin@gmail.com";`
6. Execute the migration `node run.js`.
7. Wait for the migration to finish... it might take a while.
8. Try to log in as one of the migrated users, in order to make sure that the migration was successful. 
9. Replace the imported administrator's password with the original one from step 5. Run this query on the target database: `UPDATE users WHERE email="admin@gmail.com" SET password=[OLD_PASSWORD_HASH];`

## What if something goes wrong?
- The whole migration is executed as a single transaction, therefore no changes are applied if the script fails.
- If the migration script doesn't fail, but produces undesirable results - simply restore the backup you were asked to make before running the migration.
- Either fix the problem and try again or wait for help.

## Enjoy! 
