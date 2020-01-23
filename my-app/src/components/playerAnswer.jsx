import React from 'react';
import Cookies from 'js-cookie';

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

    winner() {
        this.setState({
            win: true
        })
    }

    newGame() {
        window.location.replace('/')
    }

    newPlayer() {
        Cookies.remove('player');
        window.location.replace('/')
    }

    render() {
        console.log(this.props.guess)
        return (
            <div>
                {!this.state.win ? 
                <div>
                    <button onClick={() => this.handleClick('larger')}>My Number is Larger Than Your Guess</button>
                    <button onClick={() => this.handleClick('smaller')}>My Number is Smaller Than Your Guess</button>
                    <button onClick={this.winner}>Correct!</button>
                </div>
                :
                <div>
                    <button onClick={this.newGame}>Play Again?</button>
                    <button onClick={this.newPlayer}>New Player</button>
                </div>
                }
            </div>
        )
    }
}