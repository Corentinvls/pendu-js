import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {addRage, addJungle, addSpeed} from "../redux/actions";
import firebase from "../firebase";

/**
 * Components Home page where the score are display
 */
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

    /**
     * Method to read the table in Firebase
     */
    componentDidMount() {
        // read the score of Rage color
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

            // read the score of Jungle Click
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

                // read the score of Speed Click
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

    /**
     * Method to display the component
     * @returns {*}
     */
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

/**
 * Method to convert state in props
 * @param state
 * @returns {{speedClick: ([]|*[]), name: *, jungleClick: ([]|*[]), rageColor: ([]|*[])}}
 */
const mapStateToProps = state => {
    return {
        speedClick: state.speedClick,
        jungleClick: state.jungleClick,
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
        },
        addJungle: jungleClick => {
            dispatch(addJungle(jungleClick))
        },
        addSpeed: speedClick => {
            dispatch(addSpeed(speedClick))
        }
    };
};
/**
 * Method to connect with store
 */
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Accueil));
