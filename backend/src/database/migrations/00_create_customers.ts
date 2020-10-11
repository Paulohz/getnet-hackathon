import Knex from 'Knex';

export async function up(knex: Knex){
    return knex.schema.createTable('customers', table => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('telephone').notNullable();
        table.string('cpf').notNullable();
        table.string('adress').notNullable();
        table.integer('number').notNullable();
        table.string('complementary');
        table.string('neighborhood').notNullable();
        table.string('city').notNullable();
        table.string('state', 2).notNullable();
        table.string('zipcode').notNullable();
        table.string('country').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('avatar').notNullable();
    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable('customers');
}