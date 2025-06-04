import { getFormatedAmount } from '../utils/format.js'

export default function (data, month) {

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