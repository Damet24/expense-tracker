import { test } from "vitest";
import addCommand from '../../src/commands/add'

const data = []

test('test command', () => {
    const result = addCommand(data)
    console.log(result)
})