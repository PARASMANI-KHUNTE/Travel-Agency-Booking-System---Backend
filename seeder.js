const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('./models/Package');

dotenv.config();

mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    .then(async () => {
        console.log("Connected to MongoDB");

        // Sample Packages
        const packages = [
            {
                title: "Beach Paradise",
                description: "Enjoy a relaxing week on the beautiful beaches of Hawaii.",
                price: 1200,
                availableDates: ["2024-01-10", "2024-02-15"],
                image: "https://via.placeholder.com/150",
            },
            {
                title: "Mountain Adventure",
                description: "Experience the thrill of hiking and camping in the Rockies.",
                price: 800,
                availableDates: ["2024-03-05", "2024-04-20"],
                image: "https://via.placeholder.com/150",
            },
            {
                title: "City Explorer",
                description: "Discover the hidden gems of New York City.",
                price: 500,
                availableDates: ["2024-05-01", "2024-06-10"],
                image: "https://via.placeholder.com/150",
            },
        ];

        // Clear existing packages
        await Package.deleteMany();
        console.log("Cleared existing packages.");

        // Insert new packages
        await Package.insertMany(packages);
        console.log("Inserted sample packages.");
        process.exit(0);
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    });
