import Knex from 'Knex';

export async function up(knex: Knex){
    return knex.schema.createTable('sales', table => {
        table.increments('id').primary();
        
        table.integer('customer_id')
            .notNullable()
            .references('id')
            .inTable('customers')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.integer('company_id')
            .notNullable()
            .references('id')
            .inTable('companies')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.string('paymentForm').notNullable();
        table.decimal('finalPrice').notNullable();    

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();


    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable('sales');
}