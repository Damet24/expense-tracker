import { describe, expect, test } from 'vitest'
import addCommand from '../../src/commands/add.js'

describe('add command', () => {
    test('add item to list', () => {
        const data = [{
            id: 1,
            date: new Date(),
            description: '',
            amount: 1
        }]
        const description = 'new item'
        const amount = 10_000

        const [error, result] = addCommand(data, description, amount)
        expect(error).toBeNull()
        expect(result.length).toBe(2)
        expect(data[1].description).toBe(description)
        expect(data[1].amount).toBe(amount)
    })

    test('should throw when no arguments are passed', () => {
        const [error, result] = addCommand()
        expect(error).toBe('invalid argument')
        expect(result).toBeNull()
    })

    test('should throw when arguments are not valid [description]', () => {
        const data = []
        const [error, result] = addCommand(data, null, null)
        expect(error).toBe('invalid argument')
        expect(result).toBeNull()
    })

    test('should throw when arguments are not valid [amount]', () => {
        const data = []
        const [error, result] = addCommand(data, 'null', null)
        expect(error).toBe('invalid argument')
        expect(result).toBeNull()
    })

    test('should throw when arguments are not valid [amount]', () => {
        const data = []
        const [error, result] = addCommand(data, 'null', '')
        expect(error).toBe('invalid argument')
        expect(result).toBeNull()
    })
})