module.exports = {

    getTeams: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {coach_id} = req.params;

        dbInstance.get_teams([coach_id])
            .then( teams => res.status(200).send( teams ))
            .catch( err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!"})
                console.log(err)
            })
    },

    getTeam: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {team_id} = req.params;

        dbInstance.get_team([team_id])
            .then( team => {
                console.log(team)
                res.status(200).send( team )
            })
            .catch( err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!"})
                console.log(err)
            })
    },

    getTeamStats: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {team_id} = req.params;

        dbInstance.get_team_stats([team_id])
            .then( teamStats => {
                // console.log(teamStats)
                res.status(200).send( teamStats )
            })
            .catch( err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!"})
                console.log(err)
            })
    },

    addTeam: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {teamName, coach_id} = req.body

        dbInstance.add_team([ teamName, coach_id ])
            .then( (team) => {
                console.log(team)
                // const {team_id} = team[0]
                // console.log(team_id)
                res.status(200).send(team[0])
            })
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err)
            });
    },

    dropTeam: async (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {team_id, coach_id} = req.params;
        console.log(team_id, coach_id)

        await dbInstance.drop_team([ team_id ])
        await dbInstance.get_teams([ coach_id ])
            .then( (updatedTeams) => {
                res.status(200).send(updatedTeams)
            })
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err)
            })
    },

    getPlayer: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {player_id} = req.params;

        dbInstance.get_player([player_id])
            .then( player => {
                // console.log(player)
                res.status(200).send( player )
            })
            .catch( err => {
                res.status(500).send({ errorMessage: "Oops! Something went wrong. Our engineers have been informed!"})
                console.log(err)
            })
    },

    addPlayer: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {playername, position, team_id} = req.body

        dbInstance.add_player([ playername, position, team_id ])
            .then( () => res.sendStatus(200))
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err)
            });
    },

    addPlayerLate: async (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {playername, position, team_id} = req.body

        await dbInstance.add_player([ playername, position, team_id ])
        await dbInstance.get_team([ team_id ])
            .then( (updatedPlayers) => {
                console.log(updatedPlayers)
                res.status(200).send(updatedPlayers)
            })
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err)
            });
    },

    dropPlayer: async (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {player_id, team_id} = req.params;
        console.log(player_id, team_id)

        await dbInstance.drop_player([ player_id ])
        await dbInstance.get_team([ team_id ])
            .then( (updatedPlayers) => {
                console.log(updatedPlayers)
                res.status(200).send(updatedPlayers)
            })
            .catch( err => {
                res.status(500).send({errorMessage: "Oops! Something went wrong. Our engineers have been informed!"});
                console.log(err)
            })
    }
}