import {reducer as ingredientsReducer} from "./reducer";
import configureMockStore from 'redux-mock-store'
import * as types from "./actions";
import * as actions from "./actions";
import thunk from "redux-thunk";
import * as api from "../../utils/api";

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
        data: [],
        isLoading: false,
        success: true,
    }

    it('should loadIngredients', () => {
        const data = {data: {data: [{_id: "_id", name: "name"}]}, success: true};
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data)
        }));

        const middlewares = [thunk.withExtraArgument({api})]
        const mockStore = configureMockStore(middlewares)

        const expectedActions = [
            { type: 'GET_INGREDIENTS_REQUEST'},
            { type: 'GET_INGREDIENTS_SUCCESS', payload: {data: [{_id: "_id", name: "name"}]}  }
        ];

        const store = mockStore(initStore)
        return store
            .dispatch(actions.loadIngredients())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should loadIngredientsFAILED', () => {
        const data = { success: false };
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data)
        }));

        const middlewares = [thunk.withExtraArgument({api})]
        const mockStore = configureMockStore(middlewares)

        const expectedActions = [
            { type: 'GET_INGREDIENTS_REQUEST'},
            { type: 'GET_INGREDIENTS_FAILED' }
        ];

        const store = mockStore(initStore)
        return store
            .dispatch(actions.loadIngredients())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should return initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initStore)
    });

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        let data = [{_id: "_id", name: "name"}, {_id: "_id2", name: "name2"}]
        expect(ingredientsReducer(initStore, {
            type: types.GET_INGREDIENTS_SUCCESS,
            payload: data
        })).toEqual({
            ...initStore,
            data: [{_id: "_id", name: "name"}, {_id: "_id2", name: "name2"}],
            isLoading: false,
            success: false
        })
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(ingredientsReducer(initStore, {
            type: types.GET_INGREDIENTS_FAILED
        })).toEqual({
            ...initStore,
            isLoading: false,
            success: true
        })
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer([], {
            type: types.GET_INGREDIENTS_REQUEST
        })).toEqual({
            isLoading: true
        })
    })
})