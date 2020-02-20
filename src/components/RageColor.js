import React from 'react';
import '../App.css';

export default class JungleClick extends React.Component {


    constructor() {
        super();
        this.state = {
            time: 0,
            isOn: false,
            start: 0,
            score: 0,
            color: "White"
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.click = this.click.bind(this);

    }

    startTimer() {
        this.stopTimer();
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time,
            score: 0,
            color: this.randColor()
        });

        this.timer = setInterval(() => this.setState({
            time: (Math.round((Date.now() - this.state.start) / 100) / 10).toFixed(1)
        }), 50);
        this.timerColor = setInterval(() => this.setState({color: this.randColor()}), Math.floor(Math.random() * 3000) + 1000);
    }


    stopTimer() {
        this.setState({isOn: false, time: 0});
        clearInterval(this.timer);
        clearInterval(this.timerColor);
    }

    randColor() {
        let couleur = ["Vert", "Jaune", "Rouge", "Bleu"];
        let b = Math.floor(Math.random() * 4);
        return couleur[b];
    }

    click(value) {
        console.log("coucou");
        console.log(value);
        if (value === this.state.color) {
            this.setState({
                score: this.state.score + 1
            });
        } else {
            this.stopTimer();
        }
    }

    render() {
        let btnClass;
        switch (this.state.color) {
            case "Vert" :
                btnClass = "Vert";
                break;
            case "Jaune" :
                btnClass = "Jaune";
                break;
            case "Rouge" :
                btnClass = "Rouge";
                break;
            case "Bleu" :
                btnClass = "Bleu";
                break;
            default:
                btnClass = "White";
                break;

        }
        return (
            <div>
                <header>
                    <h1 id="maintitle">Rage Color</h1>
                    <h2>score: {(this.state.score)}  timer: {(this.state.time)}</h2>
                    <button id="newgame" type="button" onClick={this.startTimer}>Nouvelle partie</button>
                    <hr/>
                    <span className={btnClass}>look at me</span>
                    <div>


                        <button id="Vert" type="button" className={"Vert"} onClick={event => this.click("Vert")}
                                value={"Vert"}
                                disabled={!this.state.isOn}>Vert
                        </button>
                        <button type="button" className={"Jaune"} onClick={event => this.click("Jaune")} value={"Jaune"}
                                disabled={!this.state.isOn}>Jaune
                        </button>
                        <button type="button" className={"Rouge"} onClick={event => this.click("Rouge")} value={"Rouge"}
                                disabled={!this.state.isOn}>Rouge
                        </button>
                        <button type="button" className={"Bleu"} onClick={event => this.click("Bleu")} value={"Bleu"}
                                disabled={!this.state.isOn}>Bleu
                        </button>
                    </div>
                </header>

            </div>
        )
    }


}



