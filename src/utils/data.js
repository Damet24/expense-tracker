import fs from 'node:fs'
import path from 'node:path'

export function loadData(homeDir, appName, filePath, data) {
    if (!fs.existsSync(path.join(homeDir, appName))) {
        fs.mkdirSync(path.join(homeDir, appName))
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
    return data
}

export function saveData(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data))
}