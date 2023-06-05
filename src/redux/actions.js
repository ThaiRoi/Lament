export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const INCREASE_AGE = 'INCREASE_AGE';
export const GET_USERS = 'GET_USERS';

const API_URL = 'https://mocki.io/v1/d4867d8b-b5d5-4a48-a4ab-79131b5809b8';

export const getUsers = () => {
  try {
    return async dispatch => {
      const result = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const json = await result.json();
      if (json) {
        dispatch({
          type: GET_USERS,
          payload: json,
        })
      }
      else {
        console.log('cant fetch data, man');
      }
    }
  } catch (error) {
    
  }
}

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  })
}
export const setAge = age => dispatch => {
    dispatch({
      type: SET_USER_AGE,
      payload: age,
    })
  }

export const increageAge = age => dispatch => {
  dispatch({
    type: INCREASE_AGE,
    payload: age,
  })
}