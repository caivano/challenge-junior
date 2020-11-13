import { Request, Response } from 'express'
import { Project } from '../../types'
import { selectProjectById } from '../data/selectProjectById'
import { updateDeleteProject } from '../data/updateDeleteProject'

export const deleteProject = async (
    req:Request, 
    res:Response
    ): Promise<void> => {
    
    const id: number = Number(req.params.id)
    let message = 'Projeto excluído.'

    
    try {
        if(!id){
            message = 'Você precisa fornecer um ID'
            res.statusCode = 400
            throw new Error(message);
            
        }
        const isExistingProject = await selectProjectById(id)

        if(!isExistingProject){
            res.statusCode = 404
            message = 'Não existe um projeto com este nome.'
            throw new Error(message);   
        }

        await updateDeleteProject(id)

        res.send({
            message
        })
    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}
