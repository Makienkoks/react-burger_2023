import {reducer as orderReducer} from "./reducer";
import * as types from "./actions";
import * as actions from "./actions";
import * as api from "../../utils/api";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

describe('Проверка экшенов и редьюсеров', () => {
    beforeEach(() => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json:jest.fn().mockResolvedValue({
                result: 'OK'
            }),
            ok: true
        })
    })
    afterEach(() => {
        jest.restoreAllMocks()
    })

    const initStore = {
        name: '',
        success: false,
        number: '',
        isLoading: true,
    }

    it('should sendOrder', () => {
        const data = {name: "name", success: true, order: {number: "number"}};
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data)
        }));

        const middlewares = [thunk.withExtraArgument({api})]
        const mockStore = configureMockStore(middlewares)

        const expectedActions = [
            { type: 'SEND_ORDER_REQUEST'},
            { type: 'SEND_ORDER_SUCCESS', payload: data  }
        ];

        const store = mockStore(initStore)
        return store
            .dispatch(actions.sendOrder(data))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should sendOrderFAILED', () => {
        const data = {success: false};

        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data)
        }));

        const middlewares = [thunk.withExtraArgument({api})]
        const mockStore = configureMockStore(middlewares)

        const expectedActions = [
            { type: 'SEND_ORDER_REQUEST'},
            { type: 'SEND_ORDER_FAILED'}
        ];

        const store = mockStore(initStore)
        return store
            .dispatch(actions.sendOrder(data))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should sendOrderCatch', () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve()
        }));

        const middlewares = [thunk.withExtraArgument({api})]
        const mockStore = configureMockStore(middlewares)

        const expectedActions = [
            { type: 'SEND_ORDER_REQUEST'},
            { type: 'SEND_ORDER_FAILED'}
        ];

        const store = mockStore(initStore)
        return store
            .dispatch(actions.sendOrder())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initStore)
    })

    it('should handle SEND_ORDER_FAILED', () => {
        expect(orderReducer(undefined, {
            type: types.SEND_ORDER_FAILED
        })).toEqual({
            name: '',
            success: true,
            number: '',
            isLoading: false,
        })
    })

    it('should handle SEND_ORDER_REQUEST', () => {
        expect(orderReducer(undefined, {
            type: types.SEND_ORDER_REQUEST
        })).toEqual({
            ...initStore,
            "isLoading": true
        })
    })

    it('should handle SEND_ORDER_SUCCESS', () => {
        const payload = {name: "name", success: false, order: {number: "number"}};
        expect(orderReducer(undefined, {
            type: types.SEND_ORDER_SUCCESS,
            payload
        })).toEqual({
                name: "name",
                success: false,
                isLoading: false,
                number: "number"
            },
        )
    })
})