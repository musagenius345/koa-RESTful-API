import Koa from 'koa';
import Router from 'koa-router';
import { db, initDb } from './db.js';
import { koaBody } from 'koa-body';
import cors from '@koa/cors'
import serve from 'koa-static'
import fs from 'fs/promises';
import path from 'path';
import consola from 'consola'
import { fileURLToPath } from 'url';
import 'dotenv/config'
import jwt from "jsonwebtoken"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = new Koa();
const router = new Router();

app.use(serve(path.join(__dirname, 'public')))
app.use(cors())
initDb();

router.get('/todos', (ctx) => {
  consola.info('Fetching all todos')
  const todos = db.prepare('SELECT * FROM todos').all();
  ctx.body = todos;
});

router.post('/todos', (ctx) => {
  const { text } = ctx.request.body;
  consola.info(`Added '${text}' to db`)
  const stmt = db.prepare('INSERT INTO todos (text) VALUES (?)');
  const info = stmt.run(text);
  ctx.body = { id: info.lastInsertRowid, text, completed: 0 };
});

router.put('/todos/:id', (ctx) => {
  const { id } = ctx.params;
  const { text, completed } = ctx.request.body;
  consola.info(`Updated ID:'${id}' with ${JSON.stringify(ctx.request.body)} to db`)
  const stmt = db.prepare('UPDATE todos SET text = ?, completed = ? WHERE id = ?');
  stmt.run(text, completed, id);
  ctx.body = { id, text, completed };
});

router.del('/todos/:id', (ctx) => {
  const { id } = ctx.params;
  const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
  stmt.run(id);
    consola.info(`Deleted '${id}' from db`)
  ctx.status = 204;
});

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

// Serve the UI
const indexPath = path.join(__dirname, 'index.html');
router.get('/', authenticateToken, async (ctx) => {
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
  console.log(ctx.request.body);
  const {email, password} = ctx.request.body
  const token = generateToken(email)
  // => POST body
  ctx.throw('Invalid User', 500)
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


function generateToken(email: string){
  return jwt.sign(email, process.env.TOKEN_SECRET, {expiresIn: '1800s'})
}


function authenticateToken(ctx, next) {
  const authHeader = ctx.request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return ctx.status(401)

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err)

    if (err) return ctx.status(403)

    ctx.user = user

    next()
  })
}
