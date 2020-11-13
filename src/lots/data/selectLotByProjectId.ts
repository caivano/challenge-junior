import { connection } from '../..'
import { Lot } from '../../types'

export const selectLotById = async (
    id:string
    ): Promise<Lot[]> => {
    
    try {
        return await connection('lots')
        .where({
            project_id: id,
            deleted: false
        })
    } catch (error) {
        throw new Error(error.message || error.sqlMessage);
    }
}
