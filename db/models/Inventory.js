const { Model } = require('objection');
const knex = require('../knex');

/**
 * Model for an image in the database
 */
Model.knex(knex)

class Inventory extends Model {

    static get tableName() {
        return 'inventory';
    }

    // JSON schema for input validation
    static get jsonSchema() {
        return {
            type: 'object',
            required: ['name', 'description', 'amount'],

            properties: {
                id: { type: 'integer' },
                name: { type: 'string' },
                description: { type: 'string' },
                amount: { type: 'integer' },
            }
        }
    };
}

module.exports = Inventory;