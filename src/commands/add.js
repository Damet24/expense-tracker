export default function (data, description, amount) {

    if (description === null || description === undefined || typeof description !== 'string') 
        return ['invalid argument', null]

    if (amount === null || amount === undefined || typeof amount !== 'number')
        return ['invalid argument', null]

    const new_data = data

    const id = data.length + 1
    const item = {
        id: id,
        date: new Date(),
        description,
        amount
    }
    new_data.push(item)
    console.log(`Expense added successfully (ID: ${id})`)
    return [null, new_data]
}