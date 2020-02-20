import React from 'react';
import '../App.css';

export default class SpeedClick extends React.Component {


    constructor() {
        super();
        this.state = {
            time: 30,
            isOn: false,
            start: 0,
            score: 0
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.click = this.click.bind(this);

    }

    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time,
            score: 0
        });
        this.timer = setInterval(() => this.setState(this.stopTimer()), 50);
        this.timer = setInterval(() => this.setState({
            time: (30 - Math.round((Date.now() - this.state.start) / 100) / 10).toFixed(1)
        }), 50);
    }



    stopTimer() {
        if (this.state.time <= 0) {
            this.setState({isOn: false});
            clearInterval(this.timer);
            this.setState({time: 30})
        }
    }
    click() {

            this.setState({
                score: this.state.score + 1
            });


    }

    render() {

        return (
            <div>
                <header>
                    <h1 id="maintitle">Speed Click</h1>
                    <h2>timer: {(this.state.time)}</h2>
                    <h2>score: {(this.state.score)}</h2>
                    <button id="newgame" type="button" onClick={this.startTimer}>Nouvelle partie</button>
                    <hr/>
                    <div>
                        <button id="bour" type="button" className="bour" onClick={this.click} disabled={!this.state.isOn}>Bourrine
                            moi
                        </button>
                    </div>
                </header>

            </div>
        )
    }


}


/*<button onClick={this.startTimer}>start</button>
                    <button onClick={this.stopTimer}>stop</button>
                    <button onClick={this.resetTimer}>reset</button>
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

