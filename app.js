import Koa from 'koa';
import Router from 'koa-router';
import { db, initDb } from './db.js';
import { koaBody } from 'koa-body';
import serve from 'koa-static'
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'
import jwt from "jsonwebtoken"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = new Koa();
const router = new Router();

app.use(serve(path.join(__dirname, 'public')))

initDb();

router.get('/todos', (ctx) => {
  const todos = db.prepare('SELECT * FROM todos').all();
  ctx.body = todos;
});

router.post('/todos', (ctx) => {
  const { text } = ctx.request.body;
  const stmt = db.prepare('INSERT INTO todos (text) VALUES (?)');
  const info = stmt.run(text);
  ctx.body = { id: info.lastInsertRowid, text, completed: 0 };
});

router.put('/todos/:id', (ctx) => {
  const { id } = ctx.params;
  const { text, completed } = ctx.request.body;
  const stmt = db.prepare('UPDATE todos SET text = ?, completed = ? WHERE id = ?');
  stmt.run(text, completed, id);
  ctx.body = { id, text, completed };
});

router.del('/todos/:id', (ctx) => {
  const { id } = ctx.params;
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  stmt.run(id);
  ctx.status = 204;
});

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

// Serve the UI
const indexPath = path.join(__dirname, 'index.html');
router.get('/', async (ctx) => {
  try {
    const html = await fs.readFile(indexPath, 'utf8');
    ctx.type = 'html';
    ctx.body = html;
  } catch (error) {
    ctx.status = 500;
    ctx.body = 'Internal Server Error';
    console.error(error);
  }
});

router.get('/login',  async (ctx) => {
  try {
  ctx.type = 'html'
  ctx.body = await fs.readFile('public/login.html')
  } catch(e){
  ctx.type = 'json'
  console.log(e)
  ctx.body = e
  }
})

router.post('/login', async (ctx) => {
  // console.log(ctx.request)
  console.log(ctx.response)
  ctx.redirect('/')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

