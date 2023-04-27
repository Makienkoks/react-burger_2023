import { send } from '../../utils/api'
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST'
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS'
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED'

export function sendOrder(data) {
  return function(dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST
    })
    send(data).then(res => {
      if (res && res.success) {
        dispatch({
          type: SEND_ORDER_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: SEND_ORDER_FAILED,
          payload: res
        })
      }
    }).catch(err => {
      // console.log(`%c ${err}`, 'background-color: #FFC0CB');
      dispatch({
        type: SEND_ORDER_FAILED
      })
    })
  }
}