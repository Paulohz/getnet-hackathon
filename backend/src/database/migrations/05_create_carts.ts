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

        table.string('dayPrice').notNullable();
        table.string('quantity').notNullable();

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable('carts');
}