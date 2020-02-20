import React from 'react';
import '../App.css';
import {withRouter} from 'react-router-dom';
import firebase from '../firebase.js';

import {connect} from "react-redux";
import {addSpeed} from "../redux/actions";

class SpeedClick extends React.Component {
    /**
     * constructor add in the state time, isOn, start, score, speedClick
     */
    constructor() {
        super();
        this.state = {
            time: 30,
            isOn: false,
            start: 0,
            score: 0,
            speedClick: []
        };
        this.startGame = this.startGame.bind(this);
        this.stopGame = this.stopGame.bind(this);
        this.click = this.click.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     *  Add in the database name and score
     */
    handleSubmit() {
        const itemsRef = firebase.database().ref('speedClick');
        const item = {
            name: this.props.name,
            score: this.state.score,
        };
        itemsRef.push(item)
    }

    /**
     *  sort the array and add int the props and in the database and in the state
     */
    addScore() {
        let array = this.props.speedClick;
        console.log(array);
        array.push({
            name: this.props.name,
            score: this.props.score
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
        this.props.addSpeed(array);
        this.handleSubmit();
        this.setState({...this.state, speedClick: this.props.speedClick});
    }

    /**
     *  Start the timer
     */
    startGame() {
        clearInterval(this.timer);
        clearInterval(this.timerEnd);
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time,
            score: 0
        });
        this.timerEnd = setInterval(() => this.setState(this.stopGame()), 50);
        this.timer = setInterval(() => this.setState({
            time: (30 - Math.round((Date.now() - this.state.start) / 100) / 10).toFixed(1)
        }), 50);
    }

    /**
     *  Stop the timer
     */
    stopGame() {
        if (this.state.time <= 0) {
            this.setState({isOn: false});
            this.addScore();
            clearInterval(this.timer);
            clearInterval(this.timerEnd);
            this.setState({time: 30})
        }
    }

    /**
     * increment the value of score
     */
    click() {
        this.setState({
            score: this.state.score + 1
        });
    }

    /**
     *  Display the virtual DOM
     *  @return the virtual DOM
     */
    render() {

        return (
            <div>
                <header>
                    <h1 id="maintitle">Speed Click</h1>
                    <h2>score: {(this.state.score)} timer: {(this.state.time)}</h2>
                    <button id="newgame" type="button" onClick={this.startGame}>Nouvelle partie</button>
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

/**
 *  add the state in the props
 *  @return the state in the props
 */
const mapStateToProps = state => {
    return {
        speedClick: state.speedClick,
        name: state.name
    };
};

/**
 *  mapDispatchToProps is used for dispatching actions to the store.
 *  @return a function and dispatch speedClick with speedClick
 */
const mapDispatchToProps = dispatch => {
    return {
        addSpeed: speedClick => {
            dispatch(addSpeed(speedClick))
        }
    };
};

/**
 *  Create a new component that is "connected" (to borrow redux terminology) to the router.
 */
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SpeedClick));