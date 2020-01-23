import React from 'react';
import Cookies from 'js-cookie';

import {getRange, getGuesses, uploadeGuesses} from '../api/getData';
import PlayerAnswer from './playerAnswer';
import GameHistory from './gameHistory';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: this.props.from,
            to: this.props.to,
            guess: '',
            guessed: [],
            strGuesses: '',
            newGuess: false
        }
        this.generateGuess = this.generateGuess.bind(this);
        this.setGuess = this.setGuess.bind(this)
    }

    async componentDidMount() {
        if(!this.state.from && !this.state.to) {
            const player = JSON.parse(Cookies.get('player'));
            let range = await getRange(player.id);
            const rangeArray = range[0].range.split('-');
            this.setState({
                from: parseInt(rangeArray[0]),
                to: parseInt(rangeArray[1])
            }, this.generateGuess)
        }
    }

    async generateGuess() {
        const guess =  Math.floor(Math.random() * (this.state.to - this.state.from + 1) ) + this.state.from;
        const guesses = await getGuesses(JSON.parse(Cookies.get('player')).id);
        if (!guesses[0].guesses) {
            this.setState({
                newGuess: false,
                guessed: []
            }, () => this.setGuess(guess))
        }else {
            this.setState({
                newGuess: false,
                guessed: guesses[0].guesses.split(',')
            }, () => this.setGuess(guess))
        }
    }

    async setGuess(guess) {
        console.log(this.state.guessed)
       if (this.state.guessed.includes(guess.toString())) {
           this.setState({
               newGuess:true
           })
       } else {
           let guesses = this.state.guessed;
           guesses.push(guess);
           const strGuesses = guesses.join(',');
           this.setState({
               guess: guess,
               
           })
           const success = await uploadeGuesses({guess: strGuesses, id: JSON.parse(Cookies.get('player')).id})
       }
    }

    afterPlayer = (from, to) => {
        if (from === undefined) {
            this.setState({
                to: to
            }, this.generateGuess)
        }else {
            this.setState({
                from: from
            }, this.generateGuess)
        }
    }

    render() {
        console.log('from ', this.state.from, 'to ', this.state.to)
        return (
            <div>
                <h3>Computers Guess: {this.state.guess && this.state.guess}</h3>
                <PlayerAnswer guess={this.state.guess} afterPlayer={this.afterPlayer}/>
                <GameHistory/>
            </div>
        )
    }
}