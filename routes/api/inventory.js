const router = require('express').Router();
const Inventory = require('../../db/models/Inventory');

/**
 * Routes for CRUD operations on inventory items
 */

// @route GET api/inventory
// @desc Get all inventory items
// @access Public

router.get("", (req, res) => {
    Inventory.query()
        .then(arr => {
            res.json(arr);
        })
        .catch(err => {res.status(400).json(err)})
});

// @route GET api/inventory/:id
// @desc Get all inventory item with id
// @access Public

router.get("/:id", (req, res) => {
    Inventory.query()
        .where('id', req.params.id)
        .then(arr => {
            if (arr.length > 0) {
                res.json(arr[0]);
            } else {
                res.status(400).json("Item not found")
            }
        })
        .catch(err => res.status(400).json(err));
});

// @route GET api/inventory/stocked
// @desc Get all inventory items that are in stock
// @access Public

router.get("/stocked", (req, res) => {
    Inventory.query()
        .where('amount', '>', 0)
        .then(arr => {
            res.json(arr);
        })
        .catch(err => res.status(400).json(err));
});

// @route POST api/inventory
// @desc Create new inventory item
// @access Public

router.post("", (req, res) => {

    const inventory = req.body.inventory;

    // Return error if we already have an inventory item with matching name and description
    Inventory.query()
        .where('name', inventory.name)
        .andWhere('description', inventory.description)
        .then(arr => {
            if (arr.length > 0) {
                res.status(400).json("Item already exists");
            } else {
                Inventory.query()
                    .insert(inventory)
                    .then(() => res.sendStatus(201))
                    .catch(err => res.status(400).json(err))
            }
        })
        .catch(err => res.status(400).json(err));
});

// @route DELETE api/images/:id
// @desc Delete inventory item by id
// @access Public

router.delete("/:id", (req, res) => {
    Inventory.query()
        .delete()
        .where('id', req.params.id)
        .then(() => res.sendStatus(204))
        .catch(() => res.status(400).json(err))
});

// @route PUT api/images/:id
// @desc Edit inventory item by id
// @access Public

router.put("/:id", (req, res) => {

    const changes = req.body.inventory;

    Inventory.query()
        .where('id', req.params.id)
        .update(changes)
        .then(() => res.sendStatus(200))
        .catch(() => res.status(400).json(err))
});

module.exports = router;