import { Request, Response } from 'express'
import generateId from '../../services/idGenerator'
import { Lot } from '../../types'
import { insertLot } from '../data/insertLot'

export const createLot = async (
    req:Request, 
    res:Response
    ) => {
    
    let message:string = 'Lot created.'
    const { price, qty } = req.body

    try {
        if(!price || !qty){
            res.statusCode = 400
            message = 'Missing either price and/or quantity.'
            throw new Error(message)
        } else {
            const id:string = generateId()
            const purchase_date:Date = new Date()
            const lotInfo:Lot = {
                id,
                price,
                qty,
                purchase_date
            }
    
            await insertLot(lotInfo)

            res.send({
                message,
                lotInfo
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })        
    }
}
