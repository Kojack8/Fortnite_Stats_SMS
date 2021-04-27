require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
const freeclimbSDK = require('@freeclimb/sdk')
const axios = require('axios');

const port = process.env.PORT || 3000
const accountId = process.env.ACCOUNT_ID
const authToken = process.env.AUTH_TOKEN
const freeclimb = freeclimbSDK(accountId, authToken)

app.post('/incomingSms', (req, res) => {
  let to = '+17734138744'
  let from = '+19737185938'
  const name = verify_name(req['body']['text'])
  if (name == null) {
    freeclimb.api.messages.create(from, to, 'You\'ve enterted an invalid Epic name. Please try again.').catch(err => {console.log(err)})
  } 
  else {
    const response = axios.get('https://fortnite-api.com/v1/stats/br/v2', {
      params: {
        name: `${name}`
      }
    });
      response.then(function (response) {
        // handle success
        console.log('````````')
        console.log('Response')
        //freeclimb.api.messages.create(from, to, response['data']['data']).catch(err => {console.log(err)})
        const userStats = new UserStats(response['data']['data'])
        const msg = `Name: ${userStats.name}`
        console.log(msg)

      })
      .catch(function (error) {
        // handle error
        freeclimb.api.messages.create(from, to, error['response']['data']['error']).catch(err => {console.log(err)})
        
      })
  }
})

// Specify this route with 'Status Callback URL' in App Config
app.post('/status', (req, res) => {
  // handle status changes
  res.status(200)
})

app.listen(port, () => {
  console.log(`Starting server on ${port}`)
})

function verify_name(str){
  const regex = /^[a-zA-Z0-9._-]+$/
  if (str.length < 3 || str.length > 16 || regex.test(str) == false ){
    return null 
  } else {
    return str
  }
}

class UserStats {
  constructor(obj){
    this.name = obj['account']['name']
    this.level = obj['battlePass']['level']
    this.overallScore = obj['stats']['all']['overall']['score']
    this.overallWins = obj['stats']['all']['overall']['wins']
    this.overallKills = obj['stats']['all']['overall']['kills']
    this.overallKillsPerMatch = obj['stats']['all']['overall']['killsPerMatch']
    this.overallDeaths = obj['stats']['all']['overall']['deaths']
    this.overallKD = obj['stats']['all']['overall']['kd']
    this.overallMatches = obj['stats']['all']['overall']['matches']
    this.overallWinRate = obj['stats']['all']['overall']['winRate']
    this.overallMinutes = obj['stats']['all']['overall']['minutesPlayed']
  }
}

