/**
 * Seed inventory table
 * Deletes existing entries in table
 */
exports.seed = function(knex, Promise) {
    const entries = [
        {
            name: 'Croissant',
            description: 'Flaky pastry originating from France',
            amount: 20
        },
        {
            name: 'Chocolate chip cookie',
            description: 'Delicious',
            amount: 7
        },
        {
            name: 'Cinnamon roll',
            description: 'Fluffy, sweet bread roll with a cinnamon sugar swirl',
            amount: 12
        },
        {
            name: 'Brownie',
            description: 'Fudgy chocolate confection cut into squares',
            amount: 36
        },
        {
            name: 'Lemon meringue pie',
            description: 'Pie filled with lemon curd and topped with toasted meringue',
            amount: 36
        },
    ];
    return knex('inventory').del()
        .then(function () {
            return knex('inventory').insert(entries);
        });
};