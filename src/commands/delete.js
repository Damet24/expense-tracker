export default function (data, id) {
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