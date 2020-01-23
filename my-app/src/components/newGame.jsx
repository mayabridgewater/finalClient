import React from 'react';

import {startNewGame} from '../api/getData';

export default class NewGame extends React.Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            from: '',
            to: ''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onChange({target: {name, value}}) {
        this.setState({
            [name]: value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        const range = `${this.state.from}-${this.state.to}`
        const data = {range: range, first_name: this.state.first_name, last_name: this.state.last_name};
        const user = await startNewGame(data);
        window.location.replace('/game')
    }
    

    render() {
        return (
            <div className='text-center'>
                <h1>Welcome</h1>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' name='first_name' placeholder='First Name' required onChange={this.onChange}></input>
                    <input type='text' name='last_name' placeholder='Last Name' onChange={this.onChange}></input>
                    <label>Range</label>
                    <label>From</label>
                    <input type='number' name='from' required onChange={this.onChange}></input>
                    <label>To</label>
                    <input type='number' name='to' required onChange={this.onChange}></input>
                    <input type='submit'></input>
                </form>
            </div>
        )
    }
}