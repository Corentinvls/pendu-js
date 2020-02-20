import React from 'react';
import '../App.css';
import {withRouter} from 'react-router-dom';
import firebase from '../firebase.js';

import {connect} from "react-redux";
import {addSpeed} from "../redux/actions";

class SpeedClick extends React.Component {
    constructor() {
        super();
        this.state = {
            time: 30,
            isOn: false,
            start: 0,
            score: 0,
            speedClick: []
        };
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.click = this.click.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        const itemsRef = firebase.database().ref('speedClick');
        const item = {
            name: this.props.name,
            score: this.state.score,
        };
        itemsRef.push(item)
    }


    sortScore() {
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
            this.sortScore();
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
                    <h2>score: {(this.state.score)} timer: {(this.state.time)}</h2>
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

const mapStateToProps = state => {
    return {
        speedClick: state.speedClick,
        name: state.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addSpeed: speedClick => {
            dispatch(addSpeed(speedClick))
        }
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(SpeedClick));