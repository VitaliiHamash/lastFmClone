import axios from 'axios'
import {
  FETCH_DETAIL_REQUEST,
  FETCH_DETAIL_SUCCESS,
  FETCH_DETAIL_FAILURE
} from './detailTypes'

export const fetchDetail = (link) => {
  return (dispatch) => {
    dispatch(fetchDetailRequest())
    axios
      .get(link)
      
      .then(response => {
        // response.data is the users
        const users = {data:response.data}
        
        dispatch(fetchDetailSuccess(users))
      })
      .catch(error => {
        // error.message is the error message
        dispatch(fetchDetailFailure(error.message))
      })
  }
}

export const fetchDetailRequest = () => {
  return {
    type: FETCH_DETAIL_REQUEST
  }
}

export const fetchDetailSuccess = users => {
  return {
    type: FETCH_DETAIL_SUCCESS,
    payload: users
  }
}

export const fetchDetailFailure = error => {
  return {
    type: FETCH_DETAIL_FAILURE,
    payload: error
  }
}