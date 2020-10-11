import Knex from 'Knex';

export async function up(knex: Knex){
    return knex.schema.createTable('companies', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('cnpj').notNullable();
        table.string('adress').notNullable();
        table.string('number').notNullable();
        table.decimal('longitude').notNullable();
        table.decimal('latitude').notNullable();
        table.string('telephone').notNullable();
        table.string('password').notNullable();
        table.string('avatar');
    })
}

export async function down(knex:Knex){
    return knex.schema.dropTable('companies');
}