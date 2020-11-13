import { connection } from '../..'
import { Project } from '../../types';

export const selectProjectById = async (
    id:number
    ): Promise<Project> => {
    
    try {
        const result = await connection('projects')
        .where({
            id: id,
            deleted: false
        })
        return {
            id: result[0].id,
            name: result[0].name
        }
    } catch (error) {
        throw new Error(error.message || error.sqlMessage);
        
    }
}
