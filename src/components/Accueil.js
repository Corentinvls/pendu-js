import React from 'react';
import {withRouter} from 'react-router-dom';
//import firebase from '../firebase.js';

import {connect} from "react-redux";
import {addGame} from "../redux/actions";

 class Accueil extends React.Component {
    constructor() {
         super();
         this.state = {
             score: 0,
             rageColor: []
         };

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
