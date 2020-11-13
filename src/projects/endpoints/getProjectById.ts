import { Request, Response } from 'express'
import { Project } from '../../types'
import { selectAllProjects } from '../data/selectAllProjects'
import { selectProjectById } from '../data/selectProjectById'

export const getProjectById = async (
    req:Request, 
    res:Response
    ) => {
    
    const id: number = Number(req.params.id)

    try {
        const result: Project = await selectProjectById(id)

        if(!result){
            res.send({
                    message: 'Não há nenhum projeto registrado com esse id.'
                })
        }

        res.send({
            projeto: result
        })

    } catch (error) {
        res.status(400).send(error.message || error.sqlMessage)
    }
}
