const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT)
};

const Db = {

    async Get() {
        try {
            await sql.connect(config);
            const result = await sql.query(`SELECT * FROM Courses`);
            sql.close();
            return result;
        } catch (err) {
            // ... error checks
            console.log(err);
            if(sql) sql.close();
        }
    }
}

module.exports = Db;