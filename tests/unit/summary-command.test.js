import { describe, expect } from "vitest";
import summaryCommand from "../../src/commands/summary.js"


describe('summary cammand', () => {

    test('summary without mounth', () => {
        const [error, result] = summaryCommand([])
        expect(error).toBeNull()
        expect(result).toBe(0)
    })

})