import Knex from 'Knex';

export async function up(knex: Knex){
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('photo').notNullable();
        table.string('price').notNullable();
        
        table.integer('company_id')
            .notNullable()
            .references('id')
            .inTable('companies')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.integer('category_id')
            .notNullable()
            .references('id')
            .inTable('category')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.boolean('availability').notNullable();
    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable('products');
}