import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import TeamDash from './components/TeamDash/TeamDash';
import GameTracker from './components/GameTracker/GameTracker';
import NewGame from './components/NewGame/NewGame';
import NewTeam from './components/NewTeam/NewTeam';
import PlayerDetail from './components/PlayerDetail/PlayerDetail';
import Settings from './components/Settings/Settings';

export default (

    <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/register' component={Register}/>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/teamDash/:team_id' component={TeamDash} />
        <Route path='/newTeam' component={NewTeam} />
        <Route path='/newGame' component={NewGame} />
        <Route path='/gameTracker' component={GameTracker} />
        <Route path='/playerDetail/:player_id' component={PlayerDetail} />
        <Route path='/settings' component={Settings} />
    </Switch>
)