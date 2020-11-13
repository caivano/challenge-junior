import { connection } from '../../'

export const insertProject = async (
    name: string
    ):Promise<void> => {
    try {
        await connection('projects')
        .insert({
            name
        })
    } catch (error) {
        throw new Error(error.message || error.sqlMessage);
    }
}
