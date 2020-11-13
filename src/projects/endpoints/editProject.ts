import { Request, Response } from 'express'
import { selectProjectByName } from '../data/selectProjectByName'
import { updateProject } from '../data/updateProject'

export const editProject = async (
    req:Request, 
    res: Response
    ): Promise<void> => {
    
    const name: string = req.params.name as string
    const newName: string = req.body.name as string

    let message = 'Projeto atualizado.'

    try {

        const isExistingProject = await selectProjectByName(name)

        if(!isExistingProject){
            res.statusCode = 404
            message = 'Não existe um projeto com este nome.'
            throw new Error(message);
            
        }
        
        if(!newName){
            res.statusCode = 400
            message = 'Você precisa fornecer um novo nome.'
            throw new Error(message);
        }

        await updateProject(name, newName)

        res.send({
            message
        })

    } catch (error) {
        res.status(400).send(error.message || error.sqlMessage)
    }
}
