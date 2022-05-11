/**
 * Database migration for inventory table
 */
 exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('inventory', table => {
            table.increments('id').primary()
            table.string('name')
            table.string('description')
            table.integer('amount')
        })
    ])
};

exports.down = function(knex) {
    return Promise.all([knex.schema.dropTable('inventory')])
};