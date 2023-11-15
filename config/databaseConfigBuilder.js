const {MongoClient} = require('mongodb')
const logger = require('../utils/logger')(module)

const DbConnection = () =>{
    const mongoUrl =  process.env.URL_MONGO || 'mongodb://localhost:27017/'
    const dbName = process.env.DATABASE_NAME_ECOMMERCER  || 'ecommerce'

    async function DbConnect(){
        return new Promise((resolve, reject) =>{
            const options  = {
                useUnifiedTopology: true,
                readPreference: 'secondaryPreferred',
            };
            MongoClient.connect(mongoUrl,
                options,(err, client) =>{
                    if(err){
                        logger.error(`Failed to connect MongoDB Client, with error message: ${JSON.stringify(err.errmsg)}`);
                        return reject(new Error('Failed to connect mongoDB Client'));

                    }
                    db = client.db(dbName);
                    return resolve(client)
                })
                return null
        })
    }

    async function Get() {
        try {
            if(db !== null) return db;
            db = await DbConnect();
            return db; 
        } catch (e) {
            return e
        }
    }

    return {
        Get, dbName,
    }

}

