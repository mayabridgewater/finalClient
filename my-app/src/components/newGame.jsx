import React from 'react';
import Cookies from 'js-cookie';

import {startNewGame} from '../api/getData';

export default class NewGame extends React.Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            from: '',
            to: '',
            newPlayer: true
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const player = Cookies.get('player');
        if (player) {
            this.setState({
                first_name: JSON.parse(player).first_name,
                last_name: JSON.parse(player).last_name,
                newPlayer: false
            })
        }
    }

    onChange({target: {name, value}}) {
        this.setState({
            [name]: value
        })
    }

    async handleSubmit(e) {
        e.preventDefault();
        const range = `${this.state.from}-${this.state.to}`
        if (this.state.newPlayer) {
            const data = {range: range, first_name: this.state.first_name, last_name: this.state.last_name};
            const user = await startNewGame(data);
        }else {
            const data = {range: range, first_name: this.state.first_name, last_name: this.state.last_name, id: JSON.parse(Cookies.get('player')).id};
            const user = await startNewGame(data);
        }
        window.location.replace('/game')
    }
    

    render() {
        return (
            <div className='text-center d-flex' style={{height: '80vh'}}>
                <div style={{margin: 'auto'}} className='justify-content-center'>
                    <h1 style={{color: 'green'}}>Welcome</h1>
                    <form onSubmit={this.handleSubmit}>
                        {!this.state.first_name && !this.state.last_name &&
                        <div>
                            <input type='text' name='first_name' placeholder='First Name' required onChange={this.onChange}></input>
                            <input type='text' name='last_name' placeholder='Last Name' onChange={this.onChange}></input>
                        </div>
                        }
                        <div style={{fontSize: '20px'}}>Range</div>
                        <label>From</label>
                        <input type='number' name='from' required onChange={this.onChange}></input>
                        <label style={{paddingLeft: '10px'}}>To</label>
                        <input type='number' name='to' required onChange={this.onChange}></input>
                        <input type='submit' className='btn' style={{margin: '0 auto'}}></input>
                    </form>
                </div>
            </div>
        )
    }
}