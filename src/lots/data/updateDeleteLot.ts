import { connection } from '../..'

export const updateDeleteLot = async (
    id:string
    ):Promise<void> => {
    try {
        await connection('lots')
        .where('id', id)
        .update({
            deleted: true
        })
    } catch (error) {
        throw new Error(error.message || error.sqlMessage);
    }
}
