import React from 'react';
import '../App.css';
import {withRouter} from 'react-router-dom';
import firebase from '../firebase.js';

import {connect} from "react-redux";
import {addRage} from "../redux/actions";
/**
 * Components Game RageClick
 */
class RageClick extends React.Component {


    constructor() {
        super();
        this.state = {
            time: 0,
            isOn: false,
            start: 0,
            score: 0,
            color: "White",
            rageColor: []
        };
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.click = this.click.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /**
     * Method to write in Firebase
     * in jungleClick table
     */
    handleSubmit() {
        const itemsRef = firebase.database().ref('rageColor');
        const item = {
            name: this.props.name,
            score: this.state.score,
        };
        itemsRef.push(item)
    }

    /**
     * Method to add the score in the store and sort them
     */
    addScore() {
// copy the props in an array and add the new score
        let array = this.props.rageColor;
        console.log(array);
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
        this.props.addRage(array);
        this.handleSubmit();
        this.setState({...this.state, rageColor: this.props.rageColor});
    }
    /**
     * Method to start the game
     */
    startGame() {
        this.stopGame();
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

    /**
     * Method to stop the game
     */
    stopGame() {

        this.setState({isOn: false, time: 0});
        clearInterval(this.timer);
        clearInterval(this.timerColor);

    }
    /**
     * Method to generate random color
     * @returns {string}
     */
    randColor() {
        let couleur = ["Vert", "Jaune", "Rouge", "Bleu"];
        let b = Math.floor(Math.random() * 4);
        return couleur[b];
    }
    /**
     * Method increment score if the player click wright or active lose condition if it's wrong
     * @returns {string}
     */
    click(value) {
        console.log(value);
        if (value === this.state.color) {
            this.setState({
                score: this.state.score + 1
            });
        } else {
            this.addScore();
            this.stopGame();
        }
    }
    /**
     *  Display the virtual DOM
     *  @return the virtual DOM
     */
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
                    <h2>score: {(this.state.score)} timer: {(this.state.time)}</h2>
                    <button id="newgame" type="button" onClick={this.startGame}>Nouvelle partie</button>
                    <hr/>
                    <span id="look" className={btnClass}>look at me</span>
                    <div>


                        <button id="Vert" type="button" className={"Vert"} onClick={event => this.click("Vert")}
                                value={"Vert"}
                                disabled={!this.state.isOn}>
                        </button>
                        <button type="button" className={"Jaune"} onClick={event => this.click("Jaune")} value={"Jaune"}
                                disabled={!this.state.isOn}>
                        </button>
                        <button type="button" className={"Rouge"} onClick={event => this.click("Rouge")} value={"Rouge"}
                                disabled={!this.state.isOn}>
                        </button>
                        <button type="button" className={"Bleu"} onClick={event => this.click("Bleu")} value={"Bleu"}
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
        rageColor: state.rageColor,
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
        addRage: rageColor => {
            dispatch(addRage(rageColor))
        }
    };
};
/**
 * Method to connect with store
 */
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(RageClick));