import { connection } from '../..'
import { Lot } from '../../types'

export const selectLotByProjectId = async (
    id:number,
    ):Promise<Lot[]> => {
    
    try {
        return await connection('lots')
        .where({
            project_id: id,
            deleted: false
        })
    } catch (error) {
        throw new Error(error.message || error.sqlMessage)
    }
}
