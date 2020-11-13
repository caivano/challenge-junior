import { Request, Response } from 'express'
import { selectLotById } from '../data/selectLotByProjectId'
import { Lot } from '../../types'

export const getLotById = async (
    req:Request,
    res:Response
    ) => {

    const id:string = req.params.id as string
    let message:string = 'Lot found.'

    try {
        const lot:Lot[] = await selectLotById(id)

        if(!lot.length){
            res.statusCode = 404
            message = 'This lot does not exist.'
            throw new Error(message)
        } else {
            res.send({
                message,
                lot
            })
        }        
    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}
