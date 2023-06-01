import {getResponse} from "../utils/utils";

describe("check response function", () => {
    test("should be success", () => {
        const testObject = {
            ok: true,
            json: function () {
                return { result: "OK" }
            }
        }
        const result = getResponse(testObject)

        expect(result).toEqual({ result: "OK" })
    })
    test("should be failed", () => {
        const testObject = {
            ok: false,
            status: 400
        }
        const result = getResponse(testObject)

        return expect(result).rejects.toBe("Ошибка: 400")
    })
})