import React from 'react';
import Cookies from 'js-cookie';

import {getRange} from '../api/getData';

export default class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            from: '',
            to: '',
            guess: ''
        }
    }

    async componentDidMount() {
        const player = JSON.parse(Cookies.get('player'));
        let range = await getRange(player.id);
        const rangeArray = range[0].range.split('-');
        this.setState({
            from: rangeArray[0],
            to: rangeArray[1]
        })
    }
    render() {
        console.log(this.state)
        return (
            <div>
                <h3>Computers Guess: </h3>
            </div>
        )
    }
}