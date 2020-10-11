const Database = require("@replit/database");

const URL_DATABASE = process.env.REPLIT_DB_URL;
const db = new Database();
db.key = URL_DATABASE;
async function obtenerTodos() {
  let valor = await db.getAll().then(() => {
    console.log('Conectado a la BD');
  }).catch(() => {console.log('Error de conexion');});
}
obtenerTodos();
module.exports = db;