require('dotenv').config();

const auth_controller = require('./controllers/auth_controller');
const team_controller = require('./controllers/team_controller');

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();
app.use(express.static('build'));
app.use(bodyParser.json());

let {
    SERVER_PORT,
    SECRET,
    CONNECTION_STRING
} = process.env

app.use(session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    expires: 259200000
}));

massive(CONNECTION_STRING)
    .then( (dbInstance) => {
        app.set('db', dbInstance)
        console.log('connected to the db')
    })
    .catch( (err) => {
        console.log(err)
    })

app.post('/api/register', auth_controller.register)
app.post('/api/login', auth_controller.login)
app.post('/api/addTeam', team_controller.addTeam)
app.post('/api/addPlayer', team_controller.addPlayer)
app.post('/api/addPlayerLate', team_controller.addPlayerLate)
app.post('/api/createGame', team_controller.createGame)
app.post('/api/initStats', team_controller.initStats)

app.get('/api/coach_session', auth_controller.coach_session)
app.get('/api/teams/:coach_id', team_controller.getTeams)
app.get('/api/team/:team_id', team_controller.getTeam)
app.get('/api/teamStats/:team_id', team_controller.getTeamStats)
app.get('/api/player/:player_id', team_controller.getPlayer)
app.get('/api/signout', auth_controller.signout)

app.put('/api/updateEmail', auth_controller.updateEmail)
app.put('/api/updateStats', team_controller.updateStat)

app.delete('/api/dropPlayer/:player_id/:team_id', team_controller.dropPlayer)
app.delete('/api/dropTeam/:team_id/:coach_id', team_controller.dropTeam)

app.listen(SERVER_PORT, () => {
    console.log(`Docked at port: ${SERVER_PORT}`)
})