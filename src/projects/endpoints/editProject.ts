import { Request, Response } from 'express'
import { Project } from '../../types'
import { selectProjectByName } from '../data/selectProjectByName'
import { updateProject } from '../data/updateProject'

export const editProject = async (
    req:Request, 
    res: Response
    ):Promise<void> => {
    
    const name:string = req.params.name as string
    const newName:string = req.body.name as string
    let message:string = 'Project updated.'

    try {
        const isExistingProject:Project[] = await selectProjectByName(name)

        if(!isExistingProject.length){
            res.statusCode = 404
            message = 'Project not found.'
            throw new Error(message);
        }
        
        if(!newName){
            res.statusCode = 400
            message = `Missing project's new name.`
            throw new Error(message);
        } else {
            await updateProject(name, newName)
    
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
