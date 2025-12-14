const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

// For production, use the built files
const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0' // Listen on all interfaces for production
const port = parseInt(process.env.PORT || '3000', 10)

const app = next({ 
  dev,
  hostname,
  port,
  // In production, Next.js will use the .next directory automatically
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
    console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}).catch((err) => {
  console.error('Error starting server:', err)
  process.exit(1)
})

