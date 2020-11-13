import { connection } from '../..'

export const updateDeleteProject = async (
    id:number
    ): Promise<void> => {
    
    try {
        await connection('projects')
        .where('id', id)
        .update({
            deleted: true
        })
    } catch (error) {
        throw new Error(error.message || error.sqlMessage);
    }
}
