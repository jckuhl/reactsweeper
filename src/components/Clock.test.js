const Clock = require("./Clock")
// @ponicode
describe("componentDidUpdate", () => {
    let inst

    beforeEach(() => {
        inst = new Clock.default()
    })

    test("0", () => {
        let callFunction = () => {
            inst.componentDidUpdate({ active: "Becky Bednar" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.componentDidUpdate({ active: "Janet Homenick" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.componentDidUpdate({ active: "Ronald Keeling" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.componentDidUpdate({ active: "Maurice Purdy" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.componentDidUpdate({ active: "Gail Hoppe" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.componentDidUpdate(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
