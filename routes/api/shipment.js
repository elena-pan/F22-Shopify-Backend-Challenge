const router = require('express').Router();
const Inventory = require('../../db/models/Inventory');

/**
 * Routes for making shipments
 */

// @route POST api/shipment
// @desc Make a shipment
// @access Public

router.post("", async (req, res) => {
    const inventoryId = req.body.id;
    const amount = req.body.amount;

    const item = await Inventory.query().findById(inventoryId)

    if (!item) {
        res.status(400).json("Inventory item does not exist");
    } else if (item.amount-amount < 0) {
        res.status(400).json("Not enough inventory to make shipment");
    } else {
        await Inventory.query().findById(inventoryId).patch({amount: item.amount-amount});
        res.sendStatus(200);
    }
});

module.exports = router;