import { connection } from './index'

const createProjectTable = async (): Promise<void> => {
    try {
        await connection.schema.hasTable('projects').then(function(exists){
            if(!exists){
                return connection.schema.createTable('projects', (table: any) => {
                    table.increments('id').primary()
                    table.string('name').unique().notNullable()
                    table.boolean('deleted').defaultTo('false')
                })
            }
        })
    } catch (error) {
        throw new Error(error.sqlMessage) 
    }
}

const createLotTable = async (): Promise<void> => {
    try {
        await connection.schema.hasTable('lots').then(function(exists){
            if(!exists){
                return connection.schema.createTable('lots', (table: any) => {
                    table.string('id').primary()
                    table.float('price').notNullable()
                    table.integer('qty').notNullable()
                    table.date('purchase_date').notNullable()
                    table.integer('project_id').unsigned().notNullable()
                    table.foreign('project_id').references('projects.id')
                    table.boolean('deleted').defaultTo('false')
                })
            }
        })
    } catch (error) {
        throw new Error(error.sqlMessage)
    }
}

export const createTable = async (): Promise<void> => {
    try {
        await createProjectTable()
        createLotTable()
    } catch (error) {
        console.log(error)
    }
}

createTable()
