export default function (data, description, amount) {
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