import React from 'react';

export default class GameDetails extends React.Component {
    render() {
        const {date, range, player_number, amount_of_guesses, guesses} = this.props;
        return (
            <div className='col-12' style={{border: '1px solid'}}>
                <p>Date: {date}</p>
                <p>Range: {range}</p>
                <p>Winning Number: {player_number}</p>
                <p>Number of Guesses: {amount_of_guesses}</p>
                <p>Guesses: {guesses}</p>
            </div>
        )
    }
}