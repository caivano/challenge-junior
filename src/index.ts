import express, { Express } from 'express'
import cors from 'cors'
import Knex from 'knex'
import dotenv from 'dotenv'
import { AddressInfo } from 'net'
import { createProject } from './projects/endpoints/createProject'
import { editProject } from './projects/endpoints/editProject'
import { deleteProject } from './projects/endpoints/deleteProject'
import { getAllProjects } from './projects/endpoints/getAllProjects'
import { getProjectById } from './projects/endpoints/getProjectById'
import { createLot } from './lots/endpoints/createLot'
import { deleteLot } from './lots/endpoints/deleteLot'
import { getLotByProjectId } from './lots/endpoints/getLotByProjectId'
import { getLotById } from './lots/endpoints/getLotById'

dotenv.config()

const app: Express = express()

app.use(express.json())
app.use(cors())

export const connection = Knex({
    client: "mysql",
    connection: {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_NAME,
        port:3306
        }
})

app.get('/projects', getAllProjects)
app.post('/projects', createProject)
app.put('/projects/:name', editProject)
app.delete('/projects/:id', deleteProject)
app.get('/projects/:id', getProjectById)

app.post('/lots', createLot)
app.get('/lots/:project-id', getLotByProjectId)
app.delete('/lots/:id', deleteLot)
app.get('/lots/:id', getLotById)

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost:${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
})
