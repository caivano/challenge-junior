import { Request, Response } from 'express'
import { Project } from '../../types'
import { selectProjectById } from '../data/selectProjectById'
import { updateDeleteProject } from '../data/updateDeleteProject'

export const deleteProject = async (
    req:Request, 
    res:Response
    ): Promise<void> => {
    
    const id: number = Number(req.params.id)
    let message:string = 'Project deleted.'

    
    try {
        if(!id){
            res.statusCode = 400
            message = 'Missing project ID for search.'
            throw new Error(message);
            
        }
        const isExistingProject:Project[] = await selectProjectById(id)

        if(!isExistingProject){
            res.statusCode = 404
            message = 'This project does not exist.'
            throw new Error(message);   
        } else {
            await updateDeleteProject(id)
    
            res.send({
                message
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}
