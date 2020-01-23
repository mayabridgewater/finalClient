import React from 'react';
import Cookies from 'js-cookie';

import {getRange, getGuesses, uploadeGuesses} from '../api/getData';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            from: '',
            to: '',
            guess: '',
            guessed: []
        }
        this.generateGuess = this.generateGuess.bind(this);
        this.setGuess = this.setGuess.bind(this)
    }

    async componentDidMount() {
        const player = JSON.parse(Cookies.get('player'));
        let range = await getRange(player.id);
        const rangeArray = range[0].range.split('-');
        this.setState({
            from: parseInt(rangeArray[0]),
            to: parseInt(rangeArray[1])
        }, this.generateGuess)
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
       if (this.state.guessed.includes(guess)) {
           window.location.replace('/game')
       } else {
           let guesses = this.state.guessed.splice();
            guesses.push(guess);
            const strGuesses = guesses.join(',');
           this.setState({
               guess: guess
           })
           const success = await uploadeGuesses({guess: strGuesses, id: JSON.parse(Cookies.get('player')).id})
       }
    }

    render() {
        return (
            <div>
                <h3>Computers Guess: {this.state.guess && this.state.guess}</h3>
            </div>
        )
    }
}