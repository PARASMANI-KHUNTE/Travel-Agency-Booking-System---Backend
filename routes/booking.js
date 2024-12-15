const express = require('express');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Package = require('../models/Package');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, travelers, specialRequests, packageId } = req.body;

        // Validate packageId
        if (!mongoose.isValidObjectId(packageId)) {
            return res.status(400).json({ error: 'Invalid packageId format' });
        }

        const pkg = await Package.findById(packageId);
        if (!pkg) return res.status(404).json({ error: 'Package not found' });

        const totalPrice = pkg.price * travelers;

        const booking = new Booking({
            name,
            email,
            phone,
            travelers,
            specialRequests,
            packageId,
            totalPrice,
        });

        await booking.save();
        res.json({ message: 'Booking successful', booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating booking' });
    }
});


module.exports = router;
