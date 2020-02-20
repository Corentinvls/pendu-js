/*
 * action types
 */
export const ADD_RAGE = 'ADD_RAGE';
export const SET_NAME = 'SET_NAME';
export const ADD_JUNGLE = 'ADD_JUNGLE';
export const ADD_SPEED = 'ADD_SPEED';


/**
 * Add student to store
 *
 * @return     {Object}  Redux Store Object
 * @param rageColor
 */
export function addRage(rageColor) {
    return {type: ADD_RAGE, rageColor};
}

export function addJungle(jungleClick) {
    return {type: ADD_JUNGLE, jungleClick};
}

export function addSpeed(speedClick) {
    return {type: ADD_SPEED, speedClick};
}

export function setName(name) {
    return {type: SET_NAME, name};
}

