import React from 'react';
import Cookies from 'js-cookie';

import {getGameHistory} from '../api/getData';
import GameDetails from './gameDetails';

export default class GameHistory extends React.Component {
    constructor() {
        super();
        this.state = {
            player: null,
            games: []
        }
    }

    async componentDidMount() {
        const player = JSON.parse(Cookies.get('player'));
        const history = await getGameHistory(player.id);
        this.setState({
            player,
            games: history
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
                        {this.state.games.map((game, g) => <GameDetails {...game} key={g}/>)}
                    </div>
                </div>}
            </div>
        )
    }
} 