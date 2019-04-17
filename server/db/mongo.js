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
            try {
                client.connect(config.url, (err, db) => {
                    if (err) reject(err);
                    const dbo = db.db(config.db);
                    dbo.collection(config.collection).insertOne(customer, (err, res) => {
                        if (err) throw err;
                        console.log("1 document inserted");
                        db.close();
                        if(res && res.result) res.result.customer = customer;
                        resolve(res);
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    UpdateCustomer(customer) {
        return new Promise((resolve, reject) => {
            try {
                const _id = new mongodb.ObjectID(customer['_id']);
                client.connect(config.url, (err, db) => {
                    if (err) reject(err);
                    const dbo = db.db(config.db);
                    let query = { _id: _id };
                    let values = { $set: { name: customer.name, address: customer.address } };
                    dbo.collection(config.collection).updateOne(query, values, (err, res) => {
                        if (err) reject(err);
                        console.log(`1 document updated`);
                        db.close();
                        resolve(res);
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    DeleteCustomer(id) {
        return new Promise((resolve, reject) => {
            try {
                const mid = new mongodb.ObjectID(id);
                client.connect(config.url, (err, db) => {
                    if (err) reject(err);
                    const dbo = db.db(config.db);
                    dbo.collection(config.collection).deleteOne({ _id: mid }, (err, res) => {
                        if (err) reject(err);
                        console.log(`1 document deleted`);
                        db.close();
                        resolve(res);
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    GetCustomers() {
        return new Promise((resolve, reject) => {
            try {
                client.connect(config.url, (err, db) => {
                    if (err) reject(err);
                    const dbo = db.db(config.db);
                    dbo.collection(config.collection).find({}).toArray((err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    },
    GetCustomer(id) {
        return new Promise((resolve, reject) => {
            try {
                const _id = new mongodb.ObjectID(id);
                client.connect(config.url, (err, db) => {
                    if (err) reject(err);
                    const dbo = db.db(config.db);
                    dbo.collection(config.collection).findOne({ _id: _id }, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}

module.exports = NoSql;