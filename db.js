import Database from 'better-sqlite3'

export const db = new Database('todos.db');
export const initDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT,
      completed INTEGER DEFAULT 0
    );
  `);
};
