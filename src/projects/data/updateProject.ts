import { connection } from '../../'

export const updateProject = async (
    name:string,
    newName: string
    ): Promise<void> => {
    try {
        await connection('projects')
        .where('name', name)
        .update('name', newName)
    } catch (error) {
        throw new Error(error.message || error.sqlMessage);
    }
}
