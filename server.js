import { Hono } from 'hono'
import { etag } from 'hono/etag'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { serveStatic } from 'hono/bun'
const app = new Hono()

const corsOptions = {
  credentials: true
}

app.use(etag(), logger())
  .notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))
  .use(prettyJSON())
  .use(cors(corsOptions))

app.get('/', serveStatic({ root: './view/' }))

app.get('/healthz', c => {
  return c.text('ok')
})

export default { 
  port: Bun.env.PORT ?? 3000, 
  fetch: app.fetch
}
