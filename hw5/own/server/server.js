import express from 'express'
import cors from 'cors'
import path from 'path'

import guessRoute from './routes/guess'
import routerHealth from './routes/health'
import msgLog from './message'
const isProduction = process.env.NODE_ENV === 'production'

const app = express()

// init middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  if (isProduction && req.headers['x-forwarded-proto'] !== 'https')
    return res.redirect('https://' + req.headers.host + req.url)
  return next()
})

// define routes
app.use('/api/guess', guessRoute)
app.use('/api/guess/health', routerHealth)

const port = process.env.PORT || 4000

if (isProduction) {
  // set static folder
  const publicPath = path.join(__dirname, '..', 'build')
  console.log(publicPath)
  app.use(express.static(publicPath))

  app.get('*', (_, res) => {
    res.sendFile(path.join(publicPath, 'index.html')).then()
  })
}

// app.use('/healthcheck', routerHealth);

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`)
  let dt = new Date()
  let dtFormat = `${dt.getFullYear().toString().padStart(4, '0')}-${(dt.getMonth()+1).toString().padStart(2, '0')}-${dt.getDate().toString().padStart(2, '0')}-${dt.getHours().toString().padStart(2, '0')}-${dt.getMinutes().toString().padStart(2, '0')}-${dt.getSeconds().toString().padStart(2, '0')}`
  msgLog('', '', '', 'a+', dtFormat)
  // fs.writeFile(`./log/${dtFormat}.log`, '', (err) => {
  //   if (err) throw err})
})

