const initialState = {
    user: {},
    team: {},
    player_id: 0
}

// types
const UPDATE_USER = 'UPDATE_USER';
const UPDATE_TEAM = 'UPDATE_TEAM';
const UPDATE_PLAYER = 'UPDATE_PLAYER';

// action creators
export function updateUser(data) {
    return {
        type: UPDATE_USER,
        payload: data
    }
}

export function updateTeam(team) {
    return {
        type: UPDATE_TEAM,
        payload: team
    }
}

export function updatePlayer(player_id) {
    return {
        type: UPDATE_PLAYER,
        payload: player_id
    }
}

export default function reducer (state=initialState, action){
    switch(action.type){
        case UPDATE_USER:
            return Object.assign({}, state, {user: action.payload});
        case UPDATE_TEAM:
            return Object.assign({}, state, {team: action.payload});
        case UPDATE_PLAYER:
            return Object.assign({}, state, {player_id: action.payload});
        default:
            return state;
    }
}