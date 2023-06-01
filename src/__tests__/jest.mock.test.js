import {
    register,
    send,
    logout,
    login,
    forgotPass,
    token,
    resetPass,
    user,
    getIngredientsData,
    changeUserData
} from "../utils/api";
import { apiConfig } from "../utils/api";
describe("check register function", () => {
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
    test("should be success", async () => {
        const regresults = await register({email: "email", password: "password", name: "name"})
        expect(regresults).toEqual({ result: "OK" })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test("should be failed", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500"
        }));
        await expect(register({email: "email", password: "password", name: "name"})).rejects.toBe("Ошибка: 500")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${apiConfig.baseUrl}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email: "email", password: "password", name: "name"})
        })
    })
})
describe("check logout function", () => {
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
    test("should be success", async () => {
        const regresults = await logout({token: "token"})
        expect(regresults).toEqual({ result: "OK" })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test("should be failed", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500"
        }));
        await expect(logout({token: "token"})).rejects.toBe("Ошибка: 500")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${apiConfig.baseUrl}/auth/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({token: "token"})
        })
    })
})

describe("check send function", () => {
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
    test("should be success", async () => {
        const regresults = await send({ingredients: ["1", '2']})
        expect(regresults).toEqual({ result: "OK" })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test("should be failed", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500"
        }));
        await expect(send({ingredients: ["1", '2']})).rejects.toBe("Ошибка: 500")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${apiConfig.baseUrl}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: '' + localStorage.getItem('accessToken')
            },
            body: JSON.stringify({ingredients: ["1", '2']})
        })
    })
})

describe("check login function", () => {
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
    test("should be success", async () => {
        const regresults = await login({email: "email", password: "password"})
        expect(regresults).toEqual({ result: "OK" })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test("should be failed", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500"
        }));
        await expect(login({email: "email", password: "password"})).rejects.toBe("Ошибка: 500")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${apiConfig.baseUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({email: "email", password: "password"})
        })
    })
})

describe("check forgotPass function", () => {
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
    test("should be success", async () => {
        const regresults = await forgotPass({email: "email"})
        expect(regresults).toEqual({ result: "OK" })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test("should be failed", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500"
        }));
        await expect(forgotPass({email: "email"})).rejects.toBe("Ошибка: 500")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${apiConfig.baseUrl}/password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({email: "email"})
        })
    })
})
describe("check resetPass function", () => {
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
    test("should be success", async () => {
        const regresults = await resetPass({email: "email"})
        expect(regresults).toEqual({ result: "OK" })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test("should be failed", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500"
        }));
        await expect(resetPass({email: "email"})).rejects.toBe("Ошибка: 500")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${apiConfig.baseUrl}/password-reset/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({email: "email"})
        })
    })
})
describe("check token function", () => {
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
    test("should be success", async () => {
        const regresults = await token({token: "token"})
        expect(regresults).toEqual({ result: "OK" })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test("should be failed", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500"
        }));
        await expect(token({token: "token"})).rejects.toBe("Ошибка: 500")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${apiConfig.baseUrl}/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({token: "token"})
        })
    })
})

describe("check getIngredientsData function", () => {
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
    test("should be success", async () => {
        const regresults = await getIngredientsData()
        expect(regresults).toEqual({ result: "OK" })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test("should be failed", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500"
        }));
        await expect(getIngredientsData()).rejects.toBe("Ошибка: 500")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${apiConfig.baseUrl}/ingredients`)
    })
})
describe("check user function", () => {
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
    test("should be success", async () => {
        const regresults = await user()
        expect(regresults).toEqual({ result: "OK" })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test("should be failed", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500"
        }));
        await expect(user()).rejects.toBe("Ошибка: 500")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${apiConfig.baseUrl}/auth/user?`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: '' + localStorage.getItem('accessToken'),
            }
        })
    })
})

describe("check changeUser function", () => {
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
    test("should be success", async () => {
        const regresults = await changeUserData({email: "email", password: "password", name: "name"})
        expect(regresults).toEqual({ result: "OK" })
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    test("should be failed", async () => {
        fetch.mockImplementationOnce(() => Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ result: "OK" }),
            status: "500"
        }));
        await expect(changeUserData({email: "email", password: "password", name: "name"})).rejects.toBe("Ошибка: 500")
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(`${apiConfig.baseUrl}/auth/user?`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: '' + localStorage.getItem('accessToken'),
            },
            body: JSON.stringify({email: "email", password: "password", name: "name"})
        })
    })
})