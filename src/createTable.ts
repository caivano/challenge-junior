import { connection } from './index'

const createProjectTable = async (): Promise<void> => {
    try {
        await connection.schema.createTable('projects', (table: any) => {
            table.string('id').primary()
            table.string('name').unique().notNullable()
            table.boolean('deleted').defaultTo('false')
        })
    } catch (error) {
        throw new Error(error.sqlMessage) 
    }
}

const createLotTable = async (): Promise<void> => {
    try {
        await connection.schema.createTable('lots', (table: any) => {
            table.string('id').primary()
            table.float('price').notNullable()
            table.integer('qty').notNullable()
            table.datetime('purchase_date').notNullable()
            table.integer('project_id').references('projects.id')
            table.boolean('deleted').defaultTo('false')
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
        throw new Error(error.sqlMessage)
    }
}
