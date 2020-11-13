import { Request, Response } from 'express'
import { Project } from '../../types'
import { selectAllProjects } from '../data/selectAllProjects'

export const getAllProjects = async (
    req:Request, 
    res:Response
    ) => {
    
    try {
        const result:Project[] = await selectAllProjects()

        if(!result.length){
            res.send({
                    message: 'Projects table is empty.'
                })
        } else {
            res.send({
                projetos: result
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}
