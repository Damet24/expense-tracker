import Table from 'cli-table3'
const language = Intl.DateTimeFormat().resolvedOptions().locale

export function getFormatedAmount(amount) {
    const numberFormater = new Intl.NumberFormat(language, {
        style: 'currency',
        currency: 'COP',
    })
    return numberFormater.format(amount)
}

export function getFormatDate(date) {
    const dateFormater = new Intl.DateTimeFormat(language)
    return dateFormater.format(date)
}

export function mapTable(data) {
    const t = new Table({
        head: ['Id', 'Date', 'Description', 'Amount']
    })
    data.map(item => {
        t.push([item.id, getFormatDate(item.date), item.description, getFormatedAmount(item.amount)])
    })
    return t.toString()
}