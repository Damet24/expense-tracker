import {mapTable} from '../utils/format.js'

export default function list(data) {
    if (data.length == 0) {
        console.log('no hay registros')
    }
    else {
        console.log(mapTable(data))
    }
}