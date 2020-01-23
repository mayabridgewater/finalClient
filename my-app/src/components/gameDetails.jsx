import React from 'react';

export default class GameDetails extends React.Component {
    render() {
        const {date, range, player_number, amount_of_guesses, guesses} = this.props;
        return (
            <div className='col-12 details'>
                <p>Date: <span>{date}</span></p>
                <p>Range: <span>{range}</span></p>
                <p>Winning Number: <span>{player_number}</span></p>
                <p>Number of Guesses: <span>{amount_of_guesses}</span></p>
                <p>Guesses: <span>{guesses}</span></p>
            </div>
        )
    }
}