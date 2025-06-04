import chalk from 'chalk'

export default function () {
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