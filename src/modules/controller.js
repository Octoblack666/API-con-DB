const { v4: uuidv4} = require('uuid');
const db = require('../DB/db');

function createController(table, idColumn = 'id') {
   console.log(`Creando controlador para la tabla ${table}, usando columna ${idColumn}`);
   console.log(`Usando tabla: ${table} con columna: ${idColumn}`);
    return {
        getAll: () => db.getAll(table),
        getById: (id) => db.getById(table, id, idColumn),
        create: (data) => {
            if (idColumn !== 'id') {
                const id = uuidv4();
                const dataWithId = { ...data, [idColumn]: id};
                return db.insert(table, dataWithId);
            }
        },
        updateById: (id, data) => db.update(table, id, data, idColumn),
        removeById: (id) => db.remove(table, id, idColumn)
    };
}

module.exports = createController;