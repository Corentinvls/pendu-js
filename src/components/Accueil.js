import React from 'react';
import {withRouter} from 'react-router-dom';
//import firebase from '../firebase.js';

import {connect} from "react-redux";
import {addGame} from "../redux/actions";
import firebase from "../firebase";

 class Accueil extends React.Component {
    constructor() {
         super();
         this.state = {
             score: 0,
             rageColor: []
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
             this.props.addGame(newState);
             this.setState({...this.state, rageColor: this.props.rageColor});
         });
     }
	render () {
	  const {rageColor} = this.props;
	  console.log(rageColor);
		return (
			<div>
  		    	<h2> Score rageColor</h2>
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
		);
	}
}
const mapStateToProps = state => {
    return {
        rageColor: state.rageColor,
        name: state.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addGame: rageColor => {
            dispatch(addGame(rageColor))
        }
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Accueil));
