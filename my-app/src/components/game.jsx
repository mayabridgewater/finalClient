import React from 'react';
import Cookies from 'js-cookie';

import {getRange, getGuesses, uploadeGuesses} from '../api/getData';
import PlayerAnswer from './playerAnswer';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: this.props.from,
            to: this.props.to,
            guess: '',
            guessed: [],
            strGuesses: ''
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
                guessed: []
            }, () => this.setGuess(guess))
        }else {
            this.setState({
                guessed: guesses[0].guesses.split(',')
            }, () => this.setGuess(guess))
        }
    }

    async setGuess(guess) {
       if (this.state.guessed.includes(guess.toString())) {
           window.location.replace('/game')
       } else {
           console.log(this.state.guessed)
           let guesses = this.state.guessed;
           guesses.push(guess);
           console.log(guesses)
           const strGuesses = guesses.join(',');
           this.setState({
               guess: guess,
               
           })
           console.log(strGuesses);
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
        return (
            <div>
                <h3>Computers Guess: {this.state.guess && this.state.guess}</h3>
                <PlayerAnswer guess={this.state.guess} afterPlayer={this.afterPlayer}/>
            </div>
        )
    }
}