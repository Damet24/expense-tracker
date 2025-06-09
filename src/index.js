import os from 'node:os'
import fs from 'node:fs'
import path from 'node:path'
import yargs from 'yargs-parser'
import { loadData, saveData } from './utils/data.js'
import { pathToFileURL } from 'url'
import printCommandInfo from './commands/help.js'
import { isTest } from './utils/environment.js'

const appName = 'expenses'
const homeDir = os.userInfo().homedir
const dataFileName = 'data.json'
const filePath = path.join(homeDir, appName, dataFileName)
const commandsPath = './src/commands'

async function getCommands() {
    const commands = {}
    const commandPath = path.resolve(commandsPath)
    for (const fileName of fs.readdirSync(commandPath)) {
        const [name, extension] = fileName.split('.')
        if (extension === 'js') {
            const fullPath = path.join(commandPath, fileName)
            const fileUrl = pathToFileURL(fullPath).href
            const module = await import(fileUrl)
            commands[name] = module.default || module
        }
    }
    return commands
}

function syncData(action, data) {
    switch (action) {
        case 'load':
            if (data != undefined) return data
            return loadData(homeDir, appName, filePath, data)

        case 'save':
            if (data != undefined) return null,
            saveData(filePath, data)
            return null
    }
}

async function executeCommand(context, data) {

    let _data = data || []
    console.log(context, data)
    if (context._.length === 0) {
        printCommandInfo()
        return
    }
    const commands = await getCommands()
    const commandName = context._[0]
    const command = commands[commandName]

    const argumentsByCommand = {
        list: [],
        add: ['description', 'amount'],
        summary: ['month'],
        delete: ['id'],
    }

    _data = syncData('load', _data)
    const params = argumentsByCommand[commandName].map(item => {
        return context[item]
    })
    try {
        command(_data, ...params)
    } catch (error) {
    }
    syncData('save', _data)
}

if (!isTest()) await executeCommand((yargs(process.argv.slice(2))))

export default async function (data, command, params) {
    const context = { _: [command], params }
    await executeCommand(context, data)

    return { data, command, params }
}