const mongodb = require('mongodb');
const client = mongodb.MongoClient;

const config = {
    url: "mongodb://localhost:27017/",
    db: "mydb",
    collection: "customers"
};

const NoSql = {

    SaveCustomer(customer) {
        return new Promise((resolve, reject) => {
            client.connect(config.url, (err, db) => {
                if (err) reject(err);
                const dbo = db.db(config.db);
                dbo.collection(config.collection).insertOne(customer, (err, res) => {
                    if (err) throw err;
                    console.log("1 document inserted");
                    db.close();
                    resolve(res);
                });
            });
        });
    },
    UpdateCustomer(customer) {
        return new Promise((resolve, reject) => {
            client.connect(config.url, (err, db) => {
                if (err) reject(err);
                const dbo = db.db(config.db);
                let query = { _id: new mongodb.ObjectID(customer['_id']) };
                let values = { $set: { name: customer.name, address: customer.address } };
                dbo.collection(config.collection).updateOne(query, values, (err, res) => {
                    if (err) reject(err);
                    console.log(`1 document updated`);
                    db.close();
                    resolve(res);
                });
            });
        });
    },
    DeleteCustomer(id) {
        return new Promise((resolve, reject) => {
            client.connect(config.url, (err, db) => {
                if (err) reject(err);
                const dbo = db.db(config.db);
                dbo.collection(config.collection).deleteOne({ _id: new mongodb.ObjectID(id) }, (err, res) => {
                    if (err) reject(err);
                    console.log(`1 document deleted`);
                    db.close();
                    resolve(res);
                });
            });
        });
    },
    GetCustomers() {
        return new Promise((resolve, reject) => {
            client.connect(config.url, (err, db) => {
                if (err) reject(err);
                const dbo = db.db(config.db);
                dbo.collection(config.collection).find({}).toArray((err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });
        });
    }
}

module.exports = NoSql;