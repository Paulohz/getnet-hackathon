import Knex from 'Knex';

export async function up(knex: Knex){
    return knex.schema.createTable('customers', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('telephone').notNullable();
        table.string('cpf').notNullable();
        table.string('adress').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('avatar').notNullable();
    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable('customers');
}