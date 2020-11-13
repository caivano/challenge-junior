import { Request, Response } from 'express'
import generateId from '../../services/idGenerator'
import { insertLot } from '../data/insertLot'
import { Lot } from '../../types'

export const createLot = async (
    req:Request, 
    res:Response
    ) => {
    
        const { price, qty } = req.body
        let message:string = 'Lot created.'

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

            res.status(201).send({
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
