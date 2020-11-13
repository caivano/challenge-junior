import { Request, Response } from 'express'
import { Lot } from '../../types'
import { selectLotByProjectId } from '../data/selectLotByProjectId'

export const getLotByProjectId = async (
    req:Request,
    res:Response
    ) => {
    
    const projectId:number = Number(req.params.id)
    let message:string = 'Lots found.'

    try {
        const lots:Lot[] = await selectLotByProjectId(projectId)

        if(!lots.length){
            res.statusCode = 404
            message = 'This project has no registered lots.'
            throw new Error(message);   
        } else {
            res.send({
                message,
                lots
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}
