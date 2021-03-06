# Fortnite SMS Stat Tracker

## Overview
This is a simple service designed to let players review their statistics in the 
popular online game, Fortnite using SMS text messaging. All stats are provided 
by https://fortnite-api.com/

Using the program couldn't be any easier, simply text the name of the Epic ID 
that you wish to search for. You will receive a response in seconds containing 
the relevant data.

Users are able to opt out of stat sharing, therefore, some users stats may not 
be publically available or incomplete.

***
## Live Demo

FreeClimb API is a premium service that requires free trial users to verify their 
phone number before use, as a result, a live demo is unavailable for this project.

## Screenshots 

<img src="./static/IMG_1291.PNG" width="400">
<img src="./static/IMG_1292.PNG" width="400">

***
## Installation & Quick Start

Clone the repo to your local machine: 
```js
$ git clone https://github.com/Kojack8/Fortnite_Stats_SMS
```
Navigate to the directory containing that repo:
```js
$ cd Fortnite_Stats_SMS/
```
Install the needed dependencies:
```js
$ npm install
```
Make a Freeclimb Trial Account
```http
https://www.freeclimb.com/
```
Set .env variables using .env.template
```
BE CAREFUL NOT TO MAKE ANY SECRET KEYS PUBLICLY AVAILABLE 
```
Tunnel your local port using Ngrok
```js
./ngrok http 3000
```
Copy your Ngrok forwarding address and go to your application dashboard
```http
https://freeclimb.com/dashboard/portal/applications
```
Click "Edit Config" and paste the address under SMS URL and add the route /incomingSms <br/>
You may have to update this any time you relaunch Ngrok
```http
http://d9551329520c.ngrok.io/incomingSms (EXAMPLE)
```
Start
```js
$ node epicSMS.js 
```
Text your FreeClimb phone number with a valid Epic username