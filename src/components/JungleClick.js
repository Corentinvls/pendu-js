import React from 'react';
import '../App.css';
import {withRouter} from 'react-router-dom';
import firebase from '../firebase.js';

import {connect} from "react-redux";
import {addJungle} from "../redux/actions";
/**
 * Components Game JungleClick
 */
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

    /**
     * Method to write in Firebase
     * in jungleClick table
     */
    handleSubmit() {
        const itemsRef = firebase.database().ref('jungleClick');
        const item = {
            name: this.props.name,
            score: this.state.score,
        };
        itemsRef.push(item)
    }
    /**
     * Method to add the score in the store and sort them
     */
    sortScore() {
        // copy the props in an array and add the new score
        let array = this.props.jungleClick;
        array.push({
            name: this.props.name,
            score: this.props.score,
        });
        // sort the array to display the best scores
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
        // display just top five
        if (array.length > 5) {
            array.pop();
        }
        // refill the props and upload state
        this.props.addJungle(array);
        this.handleSubmit();
        this.setState({...this.state, jungleClick: this.props.jungleClick});
    }

    /**
     * Method to start the game
     */
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

    /**
     * Method to stop the game
     */
    stopTimer() {
        if (this.state.isOn) {
            this.sortScore();
        }
        this.setState({isOn: false, time: 0});
        clearInterval(this.timer);
        clearInterval(this.timerColor);
    }

    /**
     * Method to generate random color
     * @returns {string}
     */
    randColor() {
        var b = Math.floor(Math.random() * 8);
        let couleur = ["Vert", "Jaune", "Rouge", "Bleu", "Violet", "Orange", "Marron", "Rose"];
        return couleur[b];
    }
    /**
     * Method increment score if the player click wright or active lose condition if it's wrong
     * @returns {string}
     */
    click(value1, value2, value3, value4) {
        if (value1 === value2 || value1 === value3 || value1 === value4) {
            // new timer in order to generate randoms timer
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
                                disabled={!this.state.isOn}>
                        </button>
                        <button type="button" className={button2} value={button2}
                                onClick={event => this.click(button2, button3, button4, button1)}
                                disabled={!this.state.isOn}>
                        </button>
                        <button type="button" className={button3} value={button3}
                                onClick={event => this.click(button3, button2, button4, button1)}
                                disabled={!this.state.isOn}>
                        </button>
                        <button type="button" className={button4} value={button4}
                                onClick={event => this.click(button4, button3, button2, button1)}
                                disabled={!this.state.isOn}>
                        </button>
                    </div>
                </header>
            </div>
        )
    }
}
/**
 * Method to convert state in props
 * @param state
 * @returns {{speedClick: ([]|*[]), name: *, jungleClick: ([]|*[]), rageColor: ([]|*[])}}
 */
const mapStateToProps = state => {
    return {
        jungleClick: state.jungleClick,
        name: state.name
    };
};
/**
 * Method to dispatch states in the store
 * @param dispatch
 * @returns {{addJungle: addJungle, addRage: addRage, addSpeed: addSpeed}}
 */
const mapDispatchToProps = dispatch => {
    return {
        addJungle: jungleClick => {
            dispatch(addJungle(jungleClick))
        }
    };
};
/**
 * Method to connect with store
 */
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(JungleClick));

