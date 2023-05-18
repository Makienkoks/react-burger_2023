import { send } from '../../utils/api'
import { AppThunk } from "../store";
import {TOrder} from "../../utils/types";
export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST'
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS'
export const SEND_ORDER_FAILED = 'SEND_ORDER_FAILED'

export interface ISendOrderRequestAction {
  readonly type: typeof SEND_ORDER_REQUEST;
}
export interface ISendOrderRequestSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly payload: { name: string; order: { number: string }; success: boolean }
}

export interface ISendOrderRequestFailedAction {
  readonly type: typeof SEND_ORDER_FAILED;
}
export type TSendOrderActions =
    | ISendOrderRequestAction
    | ISendOrderRequestSuccessAction
    | ISendOrderRequestFailedAction

export const sendOrder = (data: TOrder): AppThunk => {
  return (dispatch) => {
    dispatch({
      type: SEND_ORDER_REQUEST
    })
    send(data).then(res => {
      if (res && res.success) {
        console.log(res)
        dispatch({
          type: SEND_ORDER_SUCCESS,
          payload: res
        })
      } else {
        dispatch({
          type: SEND_ORDER_FAILED
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