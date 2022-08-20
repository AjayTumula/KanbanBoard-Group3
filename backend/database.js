var sqlite3 = require('sqlite3').verbose()
const DBSOURCE = "./kanbanBoard.db"

let db = new sqlite3.Database(DBSOURCE, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the kanban board database.');
  });

module.exports = db
