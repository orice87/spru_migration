require('dotenv').config()
const {connect} = require('./partials/db');
const {wipeTarget} = require('./partials/wipe');
const {migrateCities, migrateRegions, migrateSchools, migrateUsers, migrateGroups}
    = require('./partials/migration');


const run = async () => {
    console.log('[1.] Setting up database connections...')

    const {source, target} = await connect();
    await target.beginTransaction();

    try {
        console.log('[2.] Wiping target database...')
        await wipeTarget(target)

        console.log('[3.] Migrating data from source database into target database...')
        await migrateRegions(source, target);
        await migrateCities(source, target);
        await migrateSchools(source, target);
        await migrateGroups(source, target)
        await migrateUsers(source, target);

        await target.commit();
    }
    catch (e) {
        await target.rollback();
        throw e;
    }

}

run()
    .then(() => console.log('Migration complete.'))
    .catch((e) => console.error(e))
    .finally(() => process.exit())
