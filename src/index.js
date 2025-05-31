import os from 'node:os'
import fs from 'node:fs'
import path from 'node:path'
import yargs from 'yargs-parser'

const homeDir = os.userInfo().homedir
const dataFileName = 'data.json'
const filePath = path.join(homeDir, 'expenses', dataFileName)
const language = Intl.DateTimeFormat().resolvedOptions().locale
let data = []

function getFormatedAmount(amount) {
    let cop = new Intl.NumberFormat(language, {
        style: 'currency',
        currency: 'COP',
    })
    return cop.format(amount)
}

function loadData() {
    if (!fs.existsSync(path.join(homeDir, 'expenses'))) {
        fs.mkdirSync(path.join(homeDir, 'expenses'))
    }
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]')
    }
    const dataFile = fs.readFileSync(filePath)
    data = JSON.parse(dataFile.toString())
    data = data.map(item => {
        const { date, ...res } = item
        const new_date = new Date(date)
        return { ...res, date: new_date }
    })
}

function saveData() {
    fs.writeFileSync(filePath, JSON.stringify(data))
}

const commands = {
    list: {
        name: 'list',
        action: function () {
            if (data.length == 0) {
                console.log('no hay registros')
            }
            else console.table(data)
        }
    },
    add: {
        name: 'add',
        action: function (description, amount) {
            const id = data.length + 1
            const item = {
                id: id,
                date: new Date(),
                description,
                amount
            }
            data.push(item)
            console.log`Expense added successfully (ID: ${id})`
        }
    },
    summary: {
        name: 'summary',
        action: function (month) {

            if (month != undefined) {
                const _data = data.filter(item => item.date.getMonth() === (month - 1))
                const result = _data.map(item => item.amount).reduce((acc, curr) => acc + curr, 0)
                const months = ["jan", "feb", "mar", "apr", "may", "jun", "july", "aug", "sep", "oct", "nov", "dec"]
                console.log(`Total expenses for ${months[month - 1]}: ${getFormatedAmount(result)}`)
            } else {
                const result = data.map(item => item.amount).reduce((acc, curr) => acc + curr, 0)
                console.log(`Total expenses for August: ${getFormatedAmount(result)}`)
            }
        }
    },
    delete: {
        name: 'delete',
        action: function (id) {
            const item = data.find(item => item.id === id)
            const index = data.indexOf(item)
            if (item != undefined && index > 0) {

                data.splice(index, 1)
                console.log('Expense deleted successfully')
            }
            else {
                console.log(`Expense with id: ${id} not found`)
            }
        }
    }
}

function execute_command(context) {
    if (context._.length == 0) {
        console.log('no cammand')
        return
    }
    const command = commands[context._[0]]

    const arguments_by_command = {
        list: [],
        add: ['description', 'amount'],
        summary: ['month'],
        delete: ['id']
    }

    const params = arguments_by_command[command.name].map(name => context[name])
    command.action(...params)
}

loadData()
execute_command(yargs(process.argv.slice(2)))
saveData()