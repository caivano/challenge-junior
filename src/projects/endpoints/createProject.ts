import { Request, Response } from 'express'
import { insertProject } from '../data/insertProject'

export const createProject = async (
    req: Request, 
    res: Response
    ) => {
        
    const name = req.body.name
    let message = 'Projeto criado com sucesso!'

    try {
        if(!name){
            res.statusCode = 406
            message = 'Você deve fornecer o nome do projeto'
            throw new Error(message);
        }

        await insertProject(name)

        res.send({
            message
        })
    } catch (error) {
        res.status(400).send({
            message: error.message || error.sqlMessage
        })
    }
}
