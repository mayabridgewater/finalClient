import React from 'react';

export default class PlayerAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: undefined,
            to: undefined
        }
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
    render() {
        return (
            <div>
                <button onClick={() => this.handleClick('larger')}>My Number is Larger Than Your Guess</button>
                <button onClick={() => this.handleClick('smaller')}>My Number is Smaller Than Your Guess</button>
                <button>Correct!</button>
            </div>
        )
    }
}