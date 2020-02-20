/*
 * action types
 */
export const ADD_GAME = 'ADD_GAME';
export const SET_NAME = 'SET_NAME';



/**
 * Add student to store
 *
 * @return     {Object}  Redux Store Object
 * @param game add name, score
 * @param name add name
 */
export function addGame(rageColor) {
    return { type: ADD_GAME, rageColor };
}
export function setName(name) {
    return { type: SET_NAME, name };
}

