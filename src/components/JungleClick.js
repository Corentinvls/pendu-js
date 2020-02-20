import React from 'react';
import '../App.css';
import {withRouter} from 'react-router-dom';
import firebase from '../firebase.js';

import {connect} from "react-redux";
import {addJungle, addRage} from "../redux/actions";
class JungleClick extends React.Component {


    constructor() {
        super();
        this.state = {
            time: 0,
            isOn: false,
            start: 0,
            score: 0,
            jungleClick: []
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.click = this.click.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit() {
        const itemsRef = firebase.database().ref('jungleClick');
        const item = {
            name: this.props.name,
            score: this.state.score,
        };
        itemsRef.push(item)
    }
    sortScore() {

        let array = this.props.jungleClick;
        array.push({
            name: this.props.name,
            score: this.props.score,
        });

        array.sort((a, b) => {
            if (a.score === -1) {
                return 1
            } else if (b.score === -1) {
                return -1
            } else if (a.score === b.score) {
                return 0;
            } else {
                if (a.score < b.score) {
                    return -1;
                } else {
                    return 1;
                }
            }
        });
        if (array.length > 5) {
            array.pop();
        }
        this.props.addJungle(array);
        this.handleSubmit();
        this.setState({...this.state, jungleClick: this.props.jungleClick});
    }
    startTimer() {

        this.stopTimer();
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time,
            score: 0,


        });
        this.timer = setInterval(() => this.setState({
            time: (Math.round((Date.now() - this.state.start) / 100) / 10).toFixed(1)
        }), Math.floor(Math.random() * 500) + 750);


    }


    stopTimer() {
        if(this.state.isOn){
            this.sortScore();
        }
        this.setState({isOn: false, time: 0});
        clearInterval(this.timer);
        clearInterval(this.timerColor);
    }

    randColor() {
        var b = Math.floor(Math.random() * 8);
        let couleur = ["Vert", "Jaune", "Rouge", "Bleu", "Violet", "Orange", "Marron", "Rose"];
        return couleur[b];
    }

    click(value1, value2, value3, value4) {
        if (value1 === value2 || value1 === value3 || value1 === value4) {

            clearInterval(this.timer);
            this.timer = setInterval(() => this.setState({
                time: (Math.round((Date.now() - this.state.start) / 100) / 10).toFixed(1)
            }), Math.floor(Math.random() * 500) + 750);

            this.setState({
                score: this.state.score + 1
            });

        } else {
            this.stopTimer();
        }

    }

    render() {
        var button1 = this.randColor();
        let button2 = this.randColor();
        let button3 = this.randColor();
        let button4 = this.randColor();
        return (
            <div>
                <header>
                    <h1 id="maintitle">Jungle Click</h1>
                    <h2>score: {(this.state.score)}</h2>
                    <button id="newgame" type="button" onClick={this.startTimer}>Nouvelle partie</button>
                    <hr/>
                    <div>
                        <button type="button" className={button1} value={button1}
                                onClick={event => this.click(button1, button2, button3, button4)}
                                disabled={!this.state.isOn}>BLABLA
                        </button>
                        <button type="button" className={button2} value={button2}
                                onClick={event => this.click(button2, button3, button4, button1)}
                                disabled={!this.state.isOn}>BLABLA
                        </button>
                        <button type="button" className={button3} value={button3}
                                onClick={event => this.click(button3, button2, button4, button1)}
                                disabled={!this.state.isOn}>BLABLA
                        </button>
                        <button type="button" className={button4} value={button4}
                                onClick={event => this.click(button4, button3, button2, button1)}
                                disabled={!this.state.isOn}>BLABLA
                        </button>
                    </div>
                </header>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        jungleClick: state.jungleClick,
        name: state.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addJungle: jungleClick => {
            dispatch(addJungle(jungleClick))
        }
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(JungleClick));

