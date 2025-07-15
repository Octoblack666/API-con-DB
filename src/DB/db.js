const mysql = require('mysql2');
const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let connection;

function connectMySQL() {
    connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.log(['[db error]'], err);
            setTimeout(connectMySQL, 200);
        } else {
            console.log('DB Conectada!');
        }
    });

    connection.on('error', err => {
        console.log(['[db error]'], err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            connectMySQL();
        } else {
            throw err;
        }
    });
}

connectMySQL();

function getAll(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (error, results) => {
            return error ? reject(error) : resolve(results);
        });
    });
}

function getById(table, id, column = 'id') {
    return new Promise((resolve, reject) => {
        connection.execute(`SELECT * FROM ${table} WHERE ${column} = ?`, [id], (error, results) => {
            return error ? reject(error) : resolve(results);
        });
    });
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (error, results) => {
            return error ? reject(error) : resolve(results);
        });
    });
}

function remove(table, id, column = 'id') {
    return new Promise((resolve, reject) => {
        connection.execute(`DELETE FROM ${table} WHERE ${column} = ?`, [id], (error, results) => {
            return error ? reject(error) : resolve(results);
        });
    });
}

function update(table, id, data, column = 'id') {
    return new Promise((resolve, reject) => {
        connection.query(
            `UPDATE ${table} SET ? WHERE ${column} = ?`,
            [data, id],
            (error, results) => {
                return error ? reject(error) : resolve(results);
            }
        );
    });
}


module.exports = {
    getAll,
    getById,
    insert,
    remove,
    update,
};