import React from 'react';
import Cookies from 'js-cookie';

import GameDetails from './gameDetails';

export default class GameHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: null,

        }
    }

    async componentDidMount(props) {
        const player = JSON.parse(Cookies.get('player'));
        this.setState({
            player
        })
    }
    render() {
        const {player} = this.state;
        return (
            <div>
                {this.state.player &&
                <div>
                    <h3>Player Name</h3>
                    <p>{player.first_name} {player.last_name}</p>
            
                    <div className='row'>
                        {this.props.history.map((game, g) => <GameDetails {...game} key={g}/>)}
                    </div>
           
                </div>}
            </div>
        )
    }
} 