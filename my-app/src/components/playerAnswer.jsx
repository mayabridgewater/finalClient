import React from 'react';
import Cookies from 'js-cookie';

import {addWin} from '../api/getData';

export default class PlayerAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: undefined,
            to: undefined,
            win: false
        }
        this.winner = this.winner.bind(this)
    }

    handleClick = (input) => {
        if (input === 'larger') {
            this.setState({
                from: this.props.guess + 1
            }, () => this.props.afterPlayer(this.state.from, this.state.to))
        }else if (input === 'smaller') {
            this.setState({
                to: this.props.guess - 1
            }, () => this.props.afterPlayer(this.state.from, this.state.to))
        }
    }

    async winner() {
        await addWin({win: this.props.guess, id: JSON.parse(Cookies.get('player')).id});
        this.setState({
            win: true
        });
    }

    newGame() {
        window.location.replace('/')
    }

    newPlayer() {
        Cookies.remove('player');
        window.location.replace('/')
    }

    render() {
        return (
            <div>
                {!this.state.win ? 
                <div>
                    <button onClick={() => this.handleClick('larger')} className='btn'>My Number is Larger Than Your Guess</button>
                    <button onClick={() => this.handleClick('smaller')} className='btn'>My Number is Smaller Than Your Guess</button>
                    <button onClick={this.winner} className='btn'>Correct!</button>
                </div>
                :
                <div>
                    <button onClick={this.newGame} className='btn'>Play Again?</button>
                    <button onClick={this.newPlayer} className='btn'>New Player</button>
                </div>
                }
            </div>
        )
    }
}