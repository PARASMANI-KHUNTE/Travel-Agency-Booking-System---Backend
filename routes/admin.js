const express = require('express');
const Package = require('../models/Package');
const Booking = require('../models/Booking')
const router = express.Router();

// Add a new package
router.post('/packages', async (req, res) => {
    try {
        const { title, description, price, availableDates, image } = req.body;
        const newPackage = new Package({ title, description, price, availableDates, image });
        await newPackage.save();
        res.json({ message: 'Package added successfully', package: newPackage });
    } catch (err) {
        res.status(500).json({ error: 'Error adding package' });
    }
});

// Update an existing package
router.put('/packages/:id', async (req, res) => {
    try {
        const updatedPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPackage) return res.status(404).json({ error: 'Package not found' });
        res.json({ message: 'Package updated successfully', package: updatedPackage });
    } catch (err) {
        res.status(500).json({ error: 'Error updating package' });
    }
});

// Delete a package
router.delete('/packages/:id', async (req, res) => {
    try {
        const deletedPackage = await Package.findByIdAndDelete(req.params.id);
        if (!deletedPackage) return res.status(404).json({ error: 'Package not found' });
        res.json({ message: 'Package deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting package' });
    }
});

// Fetch all bookings
router.get('/bookings', async (req, res) => {
    try {
        // Fetch all bookings and populate the 'packageId' field
        const bookings = await Booking.find()
            .populate('packageId'); // Populate package details

        // Check if there are any bookings
        if (bookings.length === 0) {
            return res.status(404).json({ error: 'No bookings found' });
        }

        // Respond with the fetched bookings
        res.json(bookings);
    } catch (err) {
        console.error("Error fetching bookings:", err);
        res.status(500).json({ error: 'Error fetching bookings' });
    }
});
module.exports = router;
