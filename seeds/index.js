const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60ab5502fc1e120420d8a2b6',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/doo1icjg3/image/upload/v1621958215/YelpCamp/yv7q52dvfftp1dhhbkke.jpg',
                    filename: 'YelpCamp/yv7q52dvfftp1dhhbkke'
                  },
                  {
                    url: 'https://res.cloudinary.com/doo1icjg3/image/upload/v1621958215/YelpCamp/bdvfc7gyqtdqbmqlhaf0.jpg',
                    filename: 'YelpCamp/bdvfc7gyqtdqbmqlhaf0'
                  },
                  {
                    url: 'https://res.cloudinary.com/doo1icjg3/image/upload/v1621958216/YelpCamp/mi8hg4xwoydqgrjujjjr.jpg',
                    filename: 'YelpCamp/mi8hg4xwoydqgrjujjjr'
                  }
                ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
