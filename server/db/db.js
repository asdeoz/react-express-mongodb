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
            const result = await sql.query(`
                select distinct COUR_ID, Title
                from(
                    select a.*, case when NAME like '%online%' then 'Online' else b.[Location] end as newLocation
                    from [dbo].[S3DataUpdated] a
                    left join DOT.Location_Information b on a.NAME = b.[Campus Name] and a.LC_CODE = b.[LC Code]) a
                where newLocation is not null and newLocation != 'Online' order by COUR_ID`);
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