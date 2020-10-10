import Knex from 'Knex';

export async function up(knex: Knex){
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        
        table.integer('company_id')
            .notNullable()
            .references('id')
            .inTable('companies')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable('categories');
}