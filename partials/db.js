const mysql = require('mysql2/promise');

exports.connect = async () => {
    const source = await mysql.createConnection({
        host     : process.env.SOURCE_DB_HOST,
        user     : process.env.SOURCE_DB_USERNAME,
        password : process.env.SOURCE_DB_PASSWORD,
        database : process.env.SOURCE_DB_NAME,
        port     : process.env.SOURCE_DB_PORT,
        ssl  : {
            rejectUnauthorized: false
        }
    });

    const target = await mysql.createConnection({
        host     : process.env.TARGET_DB_HOST,
        user     : process.env.TARGET_DB_USERNAME,
        password : process.env.TARGET_DB_PASSWORD,
        database : process.env.TARGET_DB_NAME,
        port     : process.env.TARGET_DB_PORT,
        ssl  : {
            rejectUnauthorized: false
        }
    });
    source.connect();
    console.log('-- Source DB connected.')
    target.connect()
    console.log('-- Target DB connected.')
    return {source, target};
}




