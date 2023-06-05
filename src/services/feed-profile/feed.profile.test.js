import * as types from "./actions";
import {wsFeedProfileReducer} from "./reducer";

const initStore = {
    status: 'OFFLINE',
    connectionError: '',
    data: {
        success: false,
        orders: [{
            _id: '',
            status: 'pending',
            number: 0,
            createdAt: '',
            updatedAt: '',
            name: '',
            ingredients: [],
        }],
        total: 0,
        totalToday: 0,
    }
}

describe('sync ducks', () => {
    it('should return initial state', () => {
        expect(wsFeedProfileReducer(undefined, {})).toEqual(initStore)
    });

    it('should handle FEED_MESSAGE', () => {
        let payload = {
            success: true,
            orders: [{
                _id: '1',
                status: 'done',
                number: 0,
                createdAt: '222',
                updatedAt: 'updatedAt',
                name: 'name',
                ingredients: ["1", "2"],
            }],
            total: 5,
            totalToday: 10,
        }
        expect(wsFeedProfileReducer(undefined, {
            type: types.wsMessage,
            payload
        })).toEqual({
            ...initStore,
            data: payload
        })
    })

    it('should handle FEED_ERROR', () => {
        let payload = "Ошибка"
        expect(wsFeedProfileReducer(undefined, {
            type: types.wsError,
            payload
        })).toEqual({
            ...initStore,
            connectionError: payload
        })
    })

    it('should handle FEED_OPEN', () => {
        expect(wsFeedProfileReducer(undefined, {
            type: types.wsOpen
        })).toEqual({
            ...initStore,
            status: 'ONLINE',
            connectionError: ''
        })
    })

    it('should handle FEED_CLOSE', () => {
        expect(wsFeedProfileReducer(undefined, {
            type: types.wsClose
        })).toEqual({
            ...initStore,
            status: 'OFFLINE'
        })
    })

    it('should handle FEED_CONNECTING', () => {
        expect(wsFeedProfileReducer(undefined, {
            type: types.wsConnecting
        })).toEqual({
            ...initStore,
            status: 'CONNECTING...'
        })
    })
})