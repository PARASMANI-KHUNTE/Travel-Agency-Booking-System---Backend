const express = require('express');
const Package = require('../models/Package');
const router = express.Router();

// GET all packages
router.get('/', async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching packages' });
    }
});

// GET package by ID
router.get('/:id', async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) return res.status(404).json({ error: 'Package not found' });
        res.json(pkg);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching package' });
    }
});

module.exports = router;
