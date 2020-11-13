import { Request, Response } from 'express'
import { Lot } from '../../types'
import { selectLotById } from '../data/selectLotByProjectId'
import { updateDeleteLot } from '../data/updateDeleteLot'

export const deleteLot = async (
    req:Request,
    res:Response
    ):Promise<void> => {
    
    let message:string = 'Lot deleted.'
    const id:string = req.params.id

    try {
        if(!id){
            message = 'You must provide an ID for search.'
            res.statusCode = 400
            throw new Error(message);
        }    

        const isExistingLot:Lot[] = await selectLotById(id)

        if(!isExistingLot){
            res.statusCode = 404
            message = 'Lot not found.'
            throw new Error(message);
        } else {
            await updateDeleteLot(id)
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