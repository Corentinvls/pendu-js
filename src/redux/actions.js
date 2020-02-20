/**
 * action types
 * @type {string}
 */
export const ADD_RAGE = 'ADD_RAGE';
export const SET_NAME = 'SET_NAME';
export const ADD_JUNGLE = 'ADD_JUNGLE';
export const ADD_SPEED = 'ADD_SPEED';


/**
 * Add Rage Color's score to store
 * @param rageColor
 * @returns {{type: string, rageColor: *}}
 */
export function addRage(rageColor) {
    return {type: ADD_RAGE, rageColor};
}
/**
 * Add Jungle Click's score to store
 * @param jungleClick
 * @returns {{type: string, jungleClick: *}}
 */
export function addJungle(jungleClick) {
    return {type: ADD_JUNGLE, jungleClick};
}
/**
 * Add Speed Click's score  to store
 * @param speedClick
 * @returns {{type: string, speedClick: *}}
 */
export function addSpeed(speedClick) {
    return {type: ADD_SPEED, speedClick};
}

/**
 * Add current user's name to store
 * @param name
 * @returns {{name: *, type: string}}
 */
export function setName(name) {
    return {type: SET_NAME, name};
}

