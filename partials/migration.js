const pagination = process.env.PAGINATION ?? 100;

exports.migrateRegions = async (source,target) => {
    const regionsCount = (await source.query('SELECT COUNT(*) AS count FROM regions'))[0][0].count;
    if (regionsCount < 1) {
        console.log('--- No regions to be migrated.')
        return;
    }

    const iterations = Math.ceil(regionsCount / pagination);

    for (let i = 0; i < iterations; i++) {
        const sourceRegionsChunk = (await source.query(`SELECT * FROM regions LIMIT ${pagination} OFFSET ${i * pagination}`))[0];

        const columnNames = Object.keys(sourceRegionsChunk[0]);
        const dataToBeInserted = sourceRegionsChunk.reduce((a, i) => [...a, Object.values(i)], []);
        const sqlQuery = `INSERT INTO regions (${columnNames.join(",")}) VALUES ?`

        await target.query(sqlQuery, [dataToBeInserted]);

        console.log(`--- ${i * pagination + sourceRegionsChunk.length} of ${regionsCount} regions migrated.`);
    }
}

exports.migrateCities = async (source,target) => {
    const citiesCount = (await source.query('SELECT COUNT(*) AS count FROM cities'))[0][0].count;

    if (citiesCount < 1) {
        console.log('--- No cities to be migrated.')
        return;
    }

    const iterations = Math.ceil(citiesCount / pagination);

    for (let i = 0; i < iterations; i++) {
        const sourceCitiesChunk = (await source.query(`SELECT * FROM cities LIMIT ${pagination} OFFSET ${i * pagination}`))[0];

        const columnNames = Object.keys(sourceCitiesChunk[0]);
        const dataToBeInserted = sourceCitiesChunk.reduce((a, i) => [...a, Object.values(i)], []);
        const sqlQuery = `INSERT INTO cities (${columnNames.join(",")}) VALUES ?`

        await target.query(sqlQuery, [dataToBeInserted]);

        console.log(`--- ${i * pagination + sourceCitiesChunk.length} of ${citiesCount} cities migrated.`);
    }
}

exports.migrateSchools = async (source,target) => {
    const schoolsCount = (await source.query('SELECT COUNT(*) AS count FROM schools'))[0][0].count;

    if (schoolsCount < 1) {
        console.log('--- No schools to be migrated.')
        return;
    }

    const iterations = Math.ceil(schoolsCount / pagination);

    for (let i = 0; i < iterations; i++) {
        const sourceSchoolsChunk = (await source.query(`SELECT * FROM schools LIMIT ${pagination} OFFSET ${i * pagination}`))[0];

        const columnNames = Object.keys(sourceSchoolsChunk[0]);
        const dataToBeInserted = sourceSchoolsChunk.reduce((a, i) => [...a, Object.values(i)], []);
        const sqlQuery = `INSERT INTO schools (${columnNames.join(",")}) VALUES ?`

        await target.query(sqlQuery, [dataToBeInserted]);

        console.log(`--- ${i * pagination + sourceSchoolsChunk.length} of ${schoolsCount} schools migrated.`);
    }
}

exports.migrateGroups = async (source,target) => {
    const groupsCount = (await source.query('SELECT COUNT(*) AS count FROM `groups`'))[0][0].count;

    if (groupsCount < 1) {
        console.log('--- No groups to be migrated.')
        return;
    }

    const iterations = Math.ceil(groupsCount / pagination);

    for (let i = 0; i < iterations; i++) {
        const sourceGroupsChunk = (await source.query(`SELECT * FROM \`groups\` LIMIT ${pagination} OFFSET ${i * pagination}`))[0];

        const columnNames = Object.keys(sourceGroupsChunk[0]);
        const dataToBeInserted = sourceGroupsChunk.reduce((a, i) => [...a, Object.values(i)], []);
        const sqlQuery = `INSERT INTO \`groups\` (${columnNames.join(",")}) VALUES ?`

        await target.query(sqlQuery, [dataToBeInserted]);

        console.log(`--- ${i * pagination + sourceGroupsChunk.length} of ${groupsCount} groups migrated.`);
    }
}

exports.migrateUsers = async (source,target) => {
    const usersCount = (await source.query('SELECT COUNT(*) AS count FROM users'))[0][0].count;

    if (usersCount < 1) {
        console.log('--- No users to be migrated.')
        return;
    }

    const iterations = Math.ceil(usersCount / pagination);

    for (let i = 0; i < iterations; i++) {
        const rawSourceUsersChunk = (await source.query(prepareUsersQuery(i)))[0];
        const sourceUsersChunk = processSourceUsersChunk(rawSourceUsersChunk);

        const columnNames = Object.keys(sourceUsersChunk[0]);
        const dataToBeInserted = sourceUsersChunk.reduce((a, i) => [...a, Object.values(i)], []);
        const sqlQuery = `INSERT INTO users (${columnNames.join(",")}) VALUES ?`

        await target.query(sqlQuery, [dataToBeInserted]);

        console.log(`--- ${i * pagination + sourceUsersChunk.length} of ${usersCount} users migrated.`);
    }
}

const processSourceUsersChunk = (sourceUsersChunk = []) => {
    return sourceUsersChunk.map(user => {
            if(user.role === 4) {
                user.group_number_entered = 12;
            }
            return user;
    });
}

const prepareUsersQuery = (i) => {
        return `SELECT 
        id, role, region_id, city_id, school_id, teacher_id, teacher_code, post, group_id,
        group_number_entered, group_type_entered, group_entered, age_argument, number_of_students,
        last_name, first_name, middle_name, responsible_person, has_nutrition_lessons, phone, email,
        new_email, email_verified_at, password, remember_token, club_card_number, is_drugoedelo, is_shared_in_vk,
        is_additional_survey, earned_presents, promotional_code, prize_promotional_code_1, prize_promotional_code_2, 
        prize_promotional_code_3, is_winner, age_group, winners_prize, remind_about_olympiad, ya_client_id, 
        oauth_vkontakte_id, oauth_yandex_id, created_at, updated_at
        FROM users 
        LIMIT ${pagination} 
        OFFSET ${i * pagination}`;
}
