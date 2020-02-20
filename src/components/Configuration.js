import React from 'react';
import { setName} from "../redux/actions";
import { withRouter } from 'react-router-dom';

import { connect } from "react-redux";

class Configuration extends React.Component {
    constructor() {
        super();

        this.state = {
           name:''
        }
    }
    setName(event){
        event.preventDefault();
        let target = event.target;

        this.props.setName(
            target[0].value
        );
    }



    render() {
        const { name } = this.props;


        return (
            <div>
                <h2>Entrez votre nom</h2>
                <form onSubmit={event => this.setName(event)}>
                    <input type="text" placeholder={name}/>
                    <button>Envoyer</button>
                </form>
            </div>
        );

    }

}
const mapStateToProps = state => {
    return {
        name: state.name
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setName: name =>{
            dispatch(setName(name))
        }
    };
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Configuration));