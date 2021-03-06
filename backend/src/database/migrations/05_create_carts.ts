import Knex from 'Knex';

export async function up(knex: Knex){
    return knex.schema.createTable('carts', table => {
        table.increments('id').primary();

        table.integer('sale_id')
            .notNullable()
            .references('id')
            .inTable('sales')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        
        table.integer('product_id')
            .notNullable()
            .references('id')
            .inTable('products')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.string('value').notNullable();
        table.integer('quantity').notNullable();
    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable('carts');
}