import {reducer as userReducer} from "./reducer";
import * as types from "./actions";
import * as actions from "./actions";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import * as api from "../../utils/api";
import {changeUser, forgotPassword, getUser, logOutUser, registrationUser, resetPassword} from "./actions";

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
        user: null,
        isLoading: false,
        success: false,
        isAuthChecked: false,
        error: ''
    }

    const middlewares = [thunk.withExtraArgument({api})]
    const mockStore = configureMockStore(middlewares)

    it('should getUser', () => {
        const data = {
            user: null,
            isLoading: false,
            success: true,
            isAuthChecked: false,
            error: ''
        };
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data)
        }));

        const expectedActions = [
            { type: 'SEND_USER_REQUEST'},
            { type: 'SET_USER', payload: data },
            { type: 'SET_AUTH_CHECKED' }
        ];
        const store = mockStore(initStore)

        return store
            .dispatch(actions.getUser())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should changeUser', () => {
        const data = {
            user: null,
            isLoading: false,
            success: true,
            isAuthChecked: false,
            error: ''
        };
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data)
        }));

        const expectedActions = [
            { type: 'SEND_USER_REQUEST'},
            { type: 'SET_USER', payload: data  },
            { type: 'SET_AUTH_CHECKED' }
        ];

        const store = mockStore(initStore)
        return store
            .dispatch(actions.changeUser())
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initStore)
    })

    it('should create an action SET_ERROR_MESSAGE', () => {
        const middlewares = [ thunk ]
        const mockStore = configureMockStore(middlewares)
        const store = mockStore(initStore)
        let ErrorMessage = "Ошибка"
        const expectedActions = [
            { type: types.SET_ERROR_MESSAGE, payload: ErrorMessage },
        ]
        store.dispatch(actions.setError(ErrorMessage))
        expect(store.getActions(ErrorMessage)).toEqual(expectedActions)
    })

    it('should registrationUser', () => {
        const data = {
            user: {email: "email", name: "name"},
            isLoading: false,
            success: true,
            isAuthChecked: false,
            error: ''
        };
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data)
        }));

        const expectedActions = [
            { type: 'SEND_USER_REQUEST'},
            { type: 'SET_USER', payload: data  }
        ];

        const store = mockStore(initStore)
        return store
            .dispatch(actions.registrationUser({email: "email", password: "password"}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should logOutUser', () => {
        const data = { success: true }
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data)
        }));

        const expectedActions = [
            { type: 'SEND_USER_REQUEST' },
            { type: 'SET_USER', payload: { user: null, success: false, isLoading: false  }  }
        ];

        const store = mockStore(initStore)
        return store
            .dispatch(actions.logOutUser({token: "token"}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should forgotPassword', () => {
        const data = { success: true }
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data)
        }));

        const expectedActions = [
            { type: 'SEND_USER_REQUEST' },
            { type: 'SET_USER', payload: { user: null, success: true, isLoading: false  }  }
        ];

        const store = mockStore(initStore)
        return store
            .dispatch(actions.forgotPassword({email: "email"}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should resetPassword', () => {
        const data = { success: true }
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: true,
            json: () => Promise.resolve(data)
        }));

        const expectedActions = [
            { type: 'SEND_USER_REQUEST' },
            { type: 'SET_USER', payload: { user: null, success: true, isLoading: false  }  }
        ];

        const store = mockStore(initStore)
        return store
            .dispatch(actions.resetPassword({email: "email"}))
            .then(() => {
                expect(store.getActions()).toEqual(expectedActions)})
    })

    it('should handle SET_ERROR_MESSAGE', () => {
        let ErrorMessage = "Ошибка"
        expect(userReducer(undefined, {
            type: types.SET_ERROR_MESSAGE,
            payload: ErrorMessage
        })).toEqual({
            ...initStore,
            "error": ErrorMessage
        })
    })

    it('should handle SET_AUTH_CHECKED', () => {
        expect(userReducer(undefined, {
            type: types.SET_AUTH_CHECKED,
        })).toEqual({
            ...initStore,
            "isAuthChecked": true
        })
    })

    it('should handle SEND_USER_FAILED', () => {
        expect(userReducer(undefined, {
            type: types.SEND_USER_FAILED
        })).toEqual({
            ...initStore,
            "success": false,
            "isLoading": false
        })
    })

    it('should handle SEND_USER_REQUEST', () => {
        expect(userReducer(undefined, {
            type: types.SEND_USER_REQUEST
        })).toEqual({
            ...initStore,
            isLoading: true
        })
    })

    it('should handle SET_USER', () => {
        const payload = {user: "user", success: true};
        expect(userReducer(undefined, {
            type: types.SET_USER,
            payload
        })).toEqual({
            ...initStore,
            user: "user",
            success: true,
        })
    })
})