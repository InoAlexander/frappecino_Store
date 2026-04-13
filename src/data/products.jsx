// 1. Import the images at the top
import bmwInterior from '../assets/images/bmw_interior.png';
import bustedTrueno from '../assets/images/bustedtrueno.png';
import sadTrueno from '../assets/images/sadtrueno.png';
import gt86Rear from '../assets/images/gt86_rear.png';
import gt86Side from '../assets/images/gt86side.png';

export const products = [
    {
        id: 1,
        name: "Extreme Bullshit!",
        price: 35.00,
        image: bmwInterior, // 2. Use the variable name, not a string
        options: ["S", "M", "L", "XL"], // Added options for your new selector
        externalLink: "https://printify.com", 
        description: "The extreme kind of bullshit. Precision engineered for maximum chaos."
    },
    {
        id: 2,
        name: "Shit you dont need",
        price: 18.00,
        image: bustedTrueno,
        options: ["OEM", "Aftermarket"],
        externalLink: "https://printful.com",
        description: "Absolutely shit you dont need. Features a busted frame and authentic 80s rust."
    },
    {
        id: 3,
        name: "Random Bullshit",
        price: 18.00,
        image: sadTrueno,
        options: ["Depressed", "Very Depressed"],
        externalLink: "https://printful.com",
        description: "Random shit you dont need. It's sad, but it's yours."
    },
    {
        id: 4,
        name: "cool shit",
        price: 18.00,
        image: gt86Rear,
        options: ["Vlands", "Stock"],
        externalLink: "https://printful.com",
        description: "Cool shit you didn't know you wanted until right now."
    },
    {
        id: 5,
        name: "nice shit",
        price: 18.00,
        image: gt86Side,
        options: ["17x7.5 + 48", "18x9.5 + 35"],
        externalLink: "https://printful.com",
        description: "The coolest shit in the catalog. Clean lines, zero bullshit."
    },
];