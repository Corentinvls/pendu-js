import React from 'react';
import '../App.css';

export default class Accueil extends React.Component {


    constructor() {
        super();
        this.state = {
            time: 0,
            isOn: false,
            start: 0
        }
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this)
    }

    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time
        });
        this.timer = setInterval(() => this.setState({
            time: Math.round((Date.now() - this.state.start)/100)/10
        }), 50);
    }

    stopTimer() {
        this.setState({isOn: false});
        clearInterval(this.timer)
    }

    resetTimer() {
        this.setState({time: 0, isOn: false})
    }

    render() {
        {

            let start = (this.state.time == 0) ?
                <button onClick={this.startTimer}>start</button> :
                null
            let stop = (this.state.time == 0 || !this.state.isOn) ?
                null :
                <button onClick={this.stopTimer}>stop</button>
            let resume = (this.state.time == 0 || this.state.isOn) ?
                null :
                <button onClick={this.startTimer}>resume</button>
            let reset = (this.state.time == 0 || this.state.isOn) ?
                null :
                <button onClick={this.resetTimer}>reset</button>
        }

        return (
            <div>
                <header>
                    <h1 id="maintitle">Speed Click</h1>
                    <button id="newgame" type="button"onClick={this.startTimer}>Nouvelle partie</button>
                    <hr/>
                </header>
                <div>
                    <h3>timer: {(this.state.time)}</h3>
                    <button onClick={this.startTimer}>start</button>
                    <button onClick={this.stopTimer}>stop</button>
                    <button onClick={this.resetTimer}>reset</button>
                </div>
            </div>
        )
    }


}


/*
const ms = require('pretty-ms')
class Timer extends React.Component {
    constructor(props){
        super(props)
        this.state
    render() {
        let start = (this.state.time == 0) ?
            <button onClick={this.startTimer}>start</button> :
            null
        let stop = (this.state.time == 0 || !this.state.isOn) ?
            null :
            <button onClick={this.stopTimer}>stop</button>
        let resume = (this.state.time == 0 || this.state.isOn) ?
            null :
            <button onClick={this.startTimer}>resume</button>
        let reset = (this.state.time == 0 || this.state.isOn) ?
            null :
            <button onClick={this.resetTimer}>reset</button>
        return(
            <div>
                <h3>timer: {ms(this.state.time)}</h3>
                {start}
                {resume}
                {stop}
                {reset}
            </div>
        )
    }
}*/

