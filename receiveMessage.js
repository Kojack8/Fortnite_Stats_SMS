require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const freeclimbSDK = require('@freeclimb/sdk')

const port = process.env.PORT || 3000
const accountId = process.env.ACCOUNT_ID
const authToken = process.env.AUTH_TOKEN
const freeclimb = freeclimbSDK(accountId, authToken)

app.post('/incomingSms', (req, res) => {
  let to = '+17734138744'
  let from = '+19737185938'
  console.log(req['body']['text'])
  freeclimb.api.messages.create(from, to, 'Good afternoon, Mr.Hunt').catch(err => {console.log(err)})
})

// Specify this route with 'Status Callback URL' in App Config
app.post('/status', (req, res) => {
  // handle status changes
  res.status(200)
})

app.listen(port, () => {
  console.log(`Starting server on ${port}`)
})