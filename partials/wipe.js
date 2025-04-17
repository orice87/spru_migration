exports.wipeTarget = async (target) => {

    const usersCount = (await target.query('SELECT COUNT(*) AS count FROM users'))[0][0].count;
    const schoolsCount = (await target.query('SELECT COUNT(*) AS count FROM schools'))[0][0].count;
    const citiesCount = (await target.query('SELECT COUNT(*) AS count FROM cities'))[0][0].count;
    const regionsCount = (await target.query('SELECT COUNT(*) AS count FROM regions'))[0][0].count;
    const groupsCount = (await target.query('SELECT COUNT(*) AS count FROM `groups`'))[0][0].count;

    console.log('-- Wiping [' + (usersCount - 1) + '] users.');
    await target.query(`DELETE FROM users`)

    console.log('-- Wiping [' + (schoolsCount) + '] schools.');
    await target.query(`DELETE FROM schools`)

    console.log('-- Wiping [' + (citiesCount) + '] cities.');
    await target.query(`DELETE FROM cities`)

    console.log('-- Wiping [' + (regionsCount) + '] regions.');
    await target.query(`DELETE FROM regions`)

    console.log('-- Wiping [' + (groupsCount) + '] groups.');
    await target.query(`DELETE FROM \`groups\``)

}
