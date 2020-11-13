import { Request, Response } from 'express'
import { insertProject } from '../data/insertProject'

export const createProject = async (
    req: Request, 
    res: Response
    ) => {
        
    const name:string = req.body.name
    let message:string = 'Project created.'

    try {
        if(!name){
            res.statusCode = 406
            message = 'Missing project name.'
            throw new Error(message);
        } else {
            await insertProject(name)
    
            res.status(201).send({
                message
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}
