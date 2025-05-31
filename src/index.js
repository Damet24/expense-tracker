import os from 'node:os'
import fs from 'node:fs'
import path from 'node:path'
import yargs from 'yargs-parser'
import Table from 'cli-table3'
import chalk from 'chalk'

const homeDir = os.userInfo().homedir
const dataFileName = 'data.json'
const filePath = path.join(homeDir, 'expenses', dataFileName)
const language = Intl.DateTimeFormat().resolvedOptions().locale
let data = []

function getFormatedAmount(amount) {
    const numberFormater = new Intl.NumberFormat(language, {
        style: 'currency',
        currency: 'COP',
    })
    return numberFormater.format(amount)
}

function getFormatDate(date) {
    const dateFormater = new Intl.DateTimeFormat(language)
    return dateFormater.format(date)
}

function mapTable(data) {
    const t = new Table({
        head: ['Id', 'Date', 'Description', 'Amount']
    })
    data.map(item => {
        t.push([item.id, getFormatDate(item.date), item.description, getFormatedAmount(item.amount)])
    })
    return t.toString()
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
            else {
                console.log(mapTable(data))
            }
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
            console.log(`Expense added successfully (ID: ${id})`)
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

function printCommandInfo() {
    console.log(``)
    console.log(chalk.bold('\tExpenses Manager v0.0'))
    console.log(`\tThis CLI tool helps you keep track of your personal expenses locally on this machine.`)
    console.log(``)
    console.log(chalk.bold('\tAvailable Commands:'))

    console.log(`\t${chalk.redBright('list')}`)
    console.log(`\t\tDisplays all recorded expenses.`)
    console.log(`\t\tExample: ${chalk.cyan('node index.js list')}`)
    console.log(``)

    console.log(`\t${chalk.yellow('add')} --description [desc] --amount [value]`)
    console.log(`\t\tAdds a new expense with a description and an amount.`)
    console.log(`\t\tExample: ${chalk.cyan('node index.js add --description "Lunch" --amount 12000')}`)
    console.log(``)

    console.log(`\t${chalk.yellowBright('summary')} [--month <1-12>]`)
    console.log(`\t\tDisplays the total expenses. Optionally filter by month (1=Jan, 12=Dec).`)
    console.log(`\t\tExample: ${chalk.cyan('node index.js summary --month 5')}`)
    console.log(``)

    console.log(`\t${chalk.greenBright('delete')} --id [number]`)
    console.log(`\t\tDeletes an expense by its ID.`)
    console.log(`\t\tExample: ${chalk.cyan('node index.js delete --id 3')}`)
    console.log(``)
}


function executeCommand(context) {
    if (context._.length == 0) {
        printCommandInfo()
        return
    }
    const command = commands[context._[0]]

    const argumentsByCommand = {
        list: [],
        add: ['description', 'amount'],
        summary: ['month'],
        delete: ['id'],
    }

    const params = argumentsByCommand[command.name].map(name => context[name])
    command.action(...params)
}

loadData()
executeCommand(yargs(process.argv.slice(2)))
saveData()