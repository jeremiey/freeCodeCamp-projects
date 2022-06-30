// server.js
// where your node app starts

// heroku-self-ping module
require('heroku-self-ping').default(
	'https://headerparser-jeremy.herokuapp.com/'
)

// init project
require('dotenv').config()
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
	res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
app.get('/api/hello', function (req, res) {
	res.json({ greeting: 'hello API' })
})

let responseObject = {}
app.enable('trust proxy') // to trace ip to user's machine
app.get('/api/whoami', (req, res) => {
	responseObject.ipaddress = req.ip
	responseObject.language = req.get('Accept-Language')
	responseObject.software = req.get('User-Agent')

	res.json(responseObject)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port)
})