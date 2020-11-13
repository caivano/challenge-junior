import { Request, Response } from 'express'
import { Project } from '../../types'
import { selectProjectById } from '../data/selectProjectById'

export const getProjectById = async (
    req:Request, 
    res:Response
    ) => {
    
    const id:number = Number(req.params.id)

    try {
        const result:Project[] = await selectProjectById(id)

        if(!result.length){
            res.send({
                    message: 'No project found for this ID.'
                })
        } else {
            res.send({
                projeto: result
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}
