const sql = require('mssql')

const config = {
    user: 'sa',
    password: '123654789',
    server: '10.5.125.37', // You can use 'localhost\\instance' to connect to named instance
    database: 'zander',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
const db = {}

const pools = new sql.ConnectionPool(config).connect()


db.query = function(queryParams) {
    // pools.then(pool => {
    //     return pool.query `select * from user where userName = ${queryParams}`
    // }).then(result => {
    //     console.dir(result)
    // }).catch(err => {
    //     // ... error checks
    // })
    return  pools.then(pool => {
        return pool.query `select * from [zander].[dbo].[user] where userName = ${queryParams}`
    })
}

// module.exports = {
// 	db: db,
// 	query: db.query
// }

module.exports = db