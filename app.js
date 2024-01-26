var fs = require('fs');
var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
//gso-20231207 var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  //gso-20231207 log_stdout.write(util.format(d) + '\n');
};

console.log('http.Server: Start');

const express = require('express');
const { Pool } = require('pg'); //postgres 20240122

const app = express();
const port = process.env.PORT || 3000;
	
console.log('http.Server: Steg 1');

const pool = new Pool({ //postgres 20240122
    user: 'your_username',
    host: 'your_host',
    database: 'your_database',
    password: 'your_password',
    port: 5432, // PostgreSQL default port
});
console.log('http.Server: Steg 2');

/*gso-20240122
app.get('/', (req, res) => {
console.log('http.Server: Start');
    res.send('Hello, this is your Node.js app on Azure!');
}); //*/

app.get('/', async (req, res) => {
console.log('http.Server: Start');
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM your_table');
        const data = result.rows;
        client.release();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

	
app.listen(port, () => {
    console.log('Server running on port ${port}');
});

console.log('http.Server: Stopp');
