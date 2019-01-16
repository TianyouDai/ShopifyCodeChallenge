const { Client } = require('pg')

exports.handler = async (event) => {

    const connectionString = 'postgres://dcgvbcvv:82vwsDEBMcjBzNphbiANeklXY_OJksyv@elmer.db.elephantsql.com:5432/dcgvbcvv'

    const client = new Client({
        connectionString: connectionString
    })

    await client.connect()

    const res = await client.query('SELECT * from fav')

    // { pk: '123' }
    console.log(res.rows[0])

    await client.end()

    const response = {
        statusCode: 200,
        body: JSON.stringify(res.rows[0]),
    };

    return response;

}
