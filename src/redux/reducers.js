import {
    SET_NAME,
    ADD_GAME,
} from './actions'


const initialState = {
    /**
     *
     * games game[{Object}]
     *
     * @param      {String}  {name}
     * @param      {Number}  {score}
     */
    name:'',
    rageColor: []
};


export default function reducer(state = initialState, action) {
    console.log('reducer', action.type);
    console.log(action.rageColor);
    console.log(state);
    switch (action.type) {

        case ADD_GAME:
            return {...state, rageColor: action.rageColor};
        case SET_NAME:
            return {...state, name: action.name};
        default :
            return state;
    }
}