import React from 'react';
import {setName} from "../redux/actions";
import {withRouter} from 'react-router-dom';

import {connect} from "react-redux";

class Configuration extends React.Component {
    /**
     *  constructor and add name in the state
     */
    constructor() {
        super();

        this.state = {
            name: ''
        }
    }

    /**
     *  event click button and set the name in the props
     */
    setName(event) {
        event.preventDefault();
        let target = event.target;

        this.props.setName(
            target[0].value
        );
    }

    /**
     *  Display the virtual DOM
     *  @return the virtual DOM
     */
    render() {
        const {name} = this.props;


        return (
            <div id="conf">
                <h2>Entrez votre nom</h2>
                <form onSubmit={event => this.setName(event)}>
                    <input type="text" placeholder={name}/>
                <br></br>
                    <button id="send">Envoyer</button>
                </form>
            </div>
        );

    }

}

/**
 *  add the state in the props
 *  @return the state in the props
 */
const mapStateToProps = state => {
    return {
        name: state.name
    };
}

/**
 *  mapDispatchToProps is used for dispatching actions to the store.
 *  @return a function and dispatch setName with name
 */
const mapDispatchToProps = dispatch => {
    return {
        setName: name => {
            dispatch(setName(name))
        }
    };
}

/**
 *  Create a new component that is "connected" (to borrow redux terminology) to the router.
 */
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Configuration));