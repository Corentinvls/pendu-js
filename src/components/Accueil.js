import React from 'react';
import {withRouter} from 'react-router-dom';
//import firebase from '../firebase.js';

import {connect} from "react-redux";
import {addRage, addJungle, addSpeed} from "../redux/actions";
import firebase from "../firebase";

class Accueil extends React.Component {
    constructor() {
        super();
        this.state = {
            score: 0,
            rageColor: [],
            jungleClick: [],
            speedClick: []

        };

    }

    componentDidMount() {
        const itemsRef = firebase.database().ref('rageColor');
        itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    name: items[item].name,
                    score: items[item].score,
                });
            }
            newState.sort((a, b) => {
                if (a.score === -1) {
                    return 1
                } else if (b.score === -1) {
                    return -1
                } else if (a.score === b.score) {
                    return 0;
                } else {
                    if (a.score > b.score) {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            });
            while (newState.length > 5) {
                newState.pop();
            }
            this.props.addRage(newState);
            this.setState({...this.state, rageColor: this.props.rageColor});

            const itemsRefjun = firebase.database().ref('jungleClick');
            itemsRefjun.on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    newState.push({
                        name: items[item].name,
                        score: items[item].score,
                    });
                }
                newState.sort((a, b) => {
                    if (a.score === -1) {
                        return 1
                    } else if (b.score === -1) {
                        return -1
                    } else if (a.score === b.score) {
                        return 0;
                    } else {
                        if (a.score > b.score) {
                            return -1;
                        } else {
                            return 1;
                        }
                    }
                });
                while (newState.length > 5) {
                    newState.pop();
                }
                this.props.addJungle(newState);
                this.setState({...this.state, jungleClick: this.props.jungleClick});

                const itemsSpeed = firebase.database().ref('speedClick');
                itemsSpeed.on('value', (snapshot) => {
                    let items = snapshot.val();
                    let newState = [];
                    for (let item in items) {
                        newState.push({
                            name: items[item].name,
                            score: items[item].score,
                        });
                    }
                    newState.sort((a, b) => {
                        if (a.score === -1) {
                            return 1
                        } else if (b.score === -1) {
                            return -1
                        } else if (a.score === b.score) {
                            return 0;
                        } else {
                            if (a.score > b.score) {
                                return -1;
                            } else {
                                return 1;
                            }
                        }
                    });
                    while (newState.length > 5) {
                        newState.pop();
                    }
                    this.props.addSpeed(newState);
                    this.setState({...this.state, speedClick: this.props.speedClick});
                });
            });
        });
    }


    render() {

        const {rageColor} = this.props;

        return (
            <div id="scorePanel">
                <div>
                    <h2> Score Rage Color </h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rageColor.map((rageColorIndex, index) => (
                            <tr key={index}>
                                <td>{rageColorIndex.name}</td>
                                <td>{rageColorIndex.score}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2> Score Jungle Click </h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.jungleClick.map((jungleClickIndex, index) => (
                            <tr key={index}>
                                <td>{jungleClickIndex.name}</td>
                                <td>{jungleClickIndex.score}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h2> Score speedClick</h2>
                    <table>
                        <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.speedClick.map((speedClickIndex, index) => (
                            <tr key={index}>
                                <td>{speedClickIndex.name}</td>
                                <td>{speedClickIndex.score}</td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        speedClick: state.speedClick,
        jungleClick: state.jungleClick,
        rageColor: state.rageColor,
        name: state.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addRage: rageColor => {
            dispatch(addRage(rageColor))
        },
        addJungle: jungleClick => {
            dispatch(addJungle(jungleClick))
        },
        addSpeed: speedClick => {
            dispatch(addSpeed(speedClick))
        }
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Accueil));
