import React from 'react';
import Cookies from 'js-cookie';

import {getGameHistory} from '../api/getData';

export default class GameHistory extends React.Component {
    constructor() {
        super();
        this.state = {
            player: null
        }
    }

    async componentDidMount() {
        const player = JSON.parse(Cookies.get('player'));
        const history = await getGameHistory(player.id);
        console.log(history)
        this.setState({
            player
        })
    }
    render() {
        const {player} = this.state;
        return (
            <div>
                {this.state.player &&
                <div className='row'>
                <div className='col-2' style={{border: '1px solid'}}>
                    <h3>Player Name</h3>
                    <p>{player.first_name} {player.last_name}</p>
                </div>
                <div className='col-2' style={{border: '1px solid'}}>
                    <h3>Date</h3>
                    <p>{player.date} {player.last_name}</p>
                </div>
                </div>}
            </div>
        )
    }
} 