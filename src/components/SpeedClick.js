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
        clearInterval(this.timer);
        clearInterval(this.timerEnd);
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time,
            score: 0
        });
        this.timerEnd = setInterval(() => this.setState(this.stopTimer()), 50);
        this.timer = setInterval(() => this.setState({
            time: (30 - Math.round((Date.now() - this.state.start) / 100) / 10).toFixed(1)
        }), 50);
    }


    stopTimer() {
        if (this.state.time <= 0) {
            this.setState({isOn: false});
            clearInterval(this.timer);
            clearInterval(this.timerEnd);
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
                    <h2>score: {(this.state.score)}  timer: {(this.state.time)}</h2>
                    <button id="newgame" type="button" onClick={this.startTimer}>Nouvelle partie</button>
                    <hr/>
                    <div>
                        <button id="bour" type="button" className="bour" onClick={this.click}
                                disabled={!this.state.isOn} unselectable={true}>
                            Bourrine moi
                        </button>
                    </div>
                </header>
            </div>
        )
    }
}


