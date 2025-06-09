
import { describe, expect, test } from 'vitest'
import deleteCommand from '../../src/commands/delete.js'

describe('delete command', () => {
    test('delete a item', () => {
        const data = [{
            id: 1,
            date: new Date(),
            description: '',
            amount: 1
        },
        {
            id: 2,
            date: new Date(),
            description: '',
            amount: 1
        },
        {
            id: 3,
            date: new Date(),
            description: '',
            amount: 1
        }]

        const [error, result] = deleteCommand(data, 2)

        expect(error).toBeNull()
        expect(result.length).toBe(2)
        expect(result.find(item => item.id === 2)).toBeUndefined()
    })

    test('should undefined when are not items in list', () => {
        const [error, result] = deleteCommand([], 1)
        expect(error).toBeNull()
        expect(result).toBeNull(undefined)
    })

    test('should throw when id is no valid', () => {
        const [error, result] = deleteCommand([], '2')
        expect(error).toBe('Invalid id')
        expect(result).toBeNull()
    })

    test('should throw when id is no valid', () => {
        const [error, result] = deleteCommand([], null)
        expect(error).toBe('Invalid id')
        expect(result).toBeNull()
    })

    test('should throw when id is no valid', () => {
        const [error, result] = deleteCommand([], undefined)
        expect(error).toBe('Invalid id')
        expect(result).toBeNull()
    })
})