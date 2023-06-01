import {reducer as orderListReducer} from "./reducer";
import configureMockStore from 'redux-mock-store'
import * as types from "./actions";
import * as actions from "./actions";
import thunk from "redux-thunk";

describe('Проверка экшенов и редьюсеров', () => {
    const middlewares = [thunk]
    const mockStore = configureMockStore(middlewares)
    const initStore =  {
        bun: null,
        ingredients: []
    }
    it('should return the initial state', () => {
        expect(orderListReducer(undefined, {})).toEqual({
            bun: null,
            ingredients: []
        })
    })

    it('should create an action deleteIngredient', () => {
        const store = mockStore(initStore)
        store.dispatch(actions.deleteIngredient({ingredients: ["1", "2", "3"]}))
        const action = store.getActions()
        const payload = {ingredients: ["1", "2", "3"]}
        const expectedActions = [{ type: 'REMOVE_INGREDIENT', payload }];
        expect(action).toEqual(expectedActions);
    })

    it('should create an action changeIngredient', () => {
        const store = mockStore(initStore)
        store.dispatch(actions.changeIngredient({ingredients: ["1", "2", "3"]}))
        const action = store.getActions()
        const payload = {ingredients: ["1", "2", "3"]}
        const expectedActions = [{ type: 'CHANGE_INGREDIENT', payload }];
        expect(action).toEqual(expectedActions);
    })

    it('should create an action addIngredient', () => {
        const store = mockStore(initStore)
        store.dispatch(actions.addIngredient({ingredients: ["1", "2", "3"], bun: ["1"]}))
        const action = store.getActions()
        const payload = {ingredients: ["1", "2", "3"], bun: ["1"]}
        const expectedActions = [{ type: 'ADD_INGREDIENT', payload }];
        expect(action).toEqual(expectedActions);
    })

    it('should handle ADD_INGREDIENT', () => {
        const payload = {ingredients: ["1", "2", "3"], bun: ["1"]};
        expect(orderListReducer(undefined, {
            type: types.ADD_INGREDIENT,
            payload
        })).toEqual({
            ingredients: ["1", "2", "3"], bun: ["1"]
        })
    })

    it('should handle REMOVE_INGREDIENT', () => {
        const payload = {ingredients: ["1", "2", "3"], bun: null};
        expect(orderListReducer(undefined, {
            type: types.REMOVE_INGREDIENT,
            payload
        })).toEqual({
            ingredients: ["1", "2", "3"], bun: null
        })
    })

    it('should handle CHANGE_INGREDIENT', () => {
        const payload = {ingredients: ["1", "2", "3"], bun: null};
        expect(orderListReducer(undefined, {
            type: types.CHANGE_INGREDIENT,
            payload
        })).toEqual({
            ingredients: ["1", "2", "3"], bun: null
            },
        )
    })
})