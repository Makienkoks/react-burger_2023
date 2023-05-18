import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { RootState } from '../store';

export type TwsActionTypes = {
    wsConnectProfile: ActionCreatorWithPayload<string>,
    wsDisconnectProfile: ActionCreatorWithoutPayload,
    wsSendMessageProfile?: ActionCreatorWithPayload<any>,
    wsConnectingProfile: ActionCreatorWithoutPayload,
    onOpenProfile: ActionCreatorWithoutPayload,
    onCloseProfile: ActionCreatorWithoutPayload,
    onErrorProfile: ActionCreatorWithPayload<string>,
    onMessageProfile: ActionCreatorWithPayload<any>,
}

export const socketMiddlewareProfile = (wsActions: TwsActionTypes): Middleware<{}, RootState> => {
    return (store) => {
        let socket: WebSocket | null = null;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = '';

        return next => action => {
            const { dispatch } = store;
            const { wsConnectProfile, wsDisconnectProfile, wsSendMessageProfile, onOpenProfile,
                onCloseProfile, onErrorProfile, onMessageProfile, wsConnectingProfile } = wsActions;

            if (wsConnectProfile.match(action)) {
                // console.log('connect Profile')
                url = action.payload;
                socket = new WebSocket(url);
                isConnected = true;
                dispatch(wsConnectingProfile());
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch(onOpenProfile());
                };

                socket.onerror = err  => {
                    // console.log('error  Profile')
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    dispatch(onMessageProfile(parsedData));
                };

                socket.onclose = event => {
                    if (event.code !== 1000) {
                        // console.log('error Profile')
                        dispatch(onErrorProfile(event.code.toString()));
                    }
                    // console.log('close')
                    dispatch(onCloseProfile());

                    if (isConnected) {
                        // console.log('isConnected Profile')
                        dispatch(wsConnectingProfile());
                        reconnectTimer = window.setTimeout(() => {
                            dispatch(wsConnectProfile(url));
                            // console.log('reconnectTimer Profile')
                        }, 3000)
                    }

                };

                if (wsSendMessageProfile && wsSendMessageProfile.match(action)) {
                    // console.log('send Profile')
                    socket.send(JSON.stringify(action.payload));
                }

                if (wsDisconnectProfile.match(action)) {
                    // console.log('disconnect Profile')
                    clearTimeout(reconnectTimer)
                    isConnected = false;
                    reconnectTimer = 0;
                    socket.close();
                    dispatch(onCloseProfile());
                }
            }

            next(action);
        };
    };
};
  