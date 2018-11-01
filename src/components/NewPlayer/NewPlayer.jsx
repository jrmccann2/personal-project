import React, {Component} from 'react';
import axios from 'axios';

class NewPlayer extends Component {
    constructor(){
        super();

        this.state = {
            playername: '',
            position: '',
            teamRoster: []
        }
        this.handleInput = this.handleInput.bind(this)
        this.addPlayer = this.addPlayer.bind(this)
    }

    handleInput(event){
        this.setState({[event.target.name]: event.target.value})
    }

    addPlayer(){
        const {playername, position} = this.state;
        this.name_input.value = '';
        this.pos_input.value = '';
        const {team_id} = this.props;
        this.setState({teamRoster: [...this.state.teamRoster, {playername, position, team_id}]})
        axios.post('/api/addPlayer', {playername, position, team_id})
            .then( (res) => console.log(res.status))
    }

    render(){

        let roster = this.state.teamRoster.map( (player, i) => {
            return (
                <div className='player-display' key={i}>
                    <h3>{player.playername}</h3>
                    <h4>{player.position}</h4>
                </div>
            )
        })

        return (
            <div className='NewPlayer'>
                <form className='player-form'>
                    <p>
                    Name:
                    <input type="text" placeholder="Player Name" name='playername' onChange={this.handleInput} ref={(ref) => this.name_input = ref}/>
                    </p>
                    <p>
                    Position:
                    <input type="text" placeholder="Position" name='position' onChange={this.handleInput} ref={(ref) => this.pos_input = ref} />
                    </p>
                </form>
                <button onClick={this.addPlayer}>Add Player</button>
                {roster}
            </div>
        )
    }
}

export default NewPlayer;