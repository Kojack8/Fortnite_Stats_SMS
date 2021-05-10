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
  let to = req['body']['from']
  let from = process.env.MY_FREECLIMB_NUMBER
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
        const userStats = new UserStats(response['data']['data'])
        const msg = `Name: ${userStats.name}\nLevel: ${userStats.level}\nOverall Score: ${userStats.overallScore}\n` +
        `Overall Wins: ${userStats.overallWins}\nOverall Kills: ${userStats.overallKills}\nOverall Kills/Match: ${userStats.overallKillsPerMatch}\n` +
        `Overall Deaths: ${userStats.overallDeaths}\nOverall Kill/Death: ${userStats.overallKD}\nOverall Matches: ${userStats.overallMatches}\n` +
        `Overall Win Rate: ${userStats.overallWinRate}\nOverall Minutes: ${userStats.overallMinutes}`
        freeclimb.api.messages.create(from, to, msg).catch(err => {console.log(err)})


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

