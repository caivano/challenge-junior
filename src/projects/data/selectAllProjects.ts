import { connection } from '../..'

export const selectAllProjects = async (): Promise<any> => {
    try {
        return await connection('projects')
        .select('id', 'name')
        .where('deleted', false)
    } catch (error) {
        throw new Error(error.message || error.sqlMessage);
    }
}
