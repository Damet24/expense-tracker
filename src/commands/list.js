import {mapTable} from '../utils/format.js'

export default function list(data) {
    console.log(data)
    if (data.length == 0) {
        console.log('no hay registros')
    }
    else {
        console.log(mapTable(data))
    }
}