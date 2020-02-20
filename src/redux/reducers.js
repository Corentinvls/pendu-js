import {
    SET_NAME,
    ADD_RAGE,
    ADD_JUNGLE,
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
    rageColor: [],
    jungleClick: []
};


export default function reducer(state = initialState, action) {
    console.log('reducer', action.type);
    console.log(action.rageColor);
    console.log(state);
    switch (action.type) {

        case ADD_RAGE:
            return {...state, rageColor: action.rageColor};
        case SET_NAME:
            return {...state, name: action.name};
        case ADD_JUNGLE:
            return {...state, jungleClick: action.jungleClick};
        default :
            return state;
    }
}