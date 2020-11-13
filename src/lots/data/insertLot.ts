import { connection } from '../..'
import { Lot } from '../../types'

export const insertLot = async (
    lotInfo:Lot
    ):Promise<void> => {
    
    try {
        await connection('lots')
        .insert(lotInfo)
    } catch (error) {
        throw new Error(error.message || error.sqlMessage)
    }
}
