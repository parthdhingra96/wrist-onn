require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const sampleProducts = [
  {
    name: 'Royal Oak Perpetual Calendar',
    description: 'Luxury automatic chronograph with perpetual calendar. 41mm case in stainless steel, blue dial. Swiss made.',
    price: 89500,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600',
    category: 'luxury',
    stock: 3,
  },
  {
    name: 'Submariner Date',
    description: 'Iconic dive watch. 41mm Oystersteel, black dial, Cerachrom bezel. Water resistant 300m.',
    price: 10500,
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600',
    category: 'sport',
    stock: 8,
  },
  {
    name: 'Santos de Cartier',
    description: 'Square case in steel and 18K gold. Blue dial, leather strap. Quartz movement.',
    price: 6750,
    image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600',
    category: 'luxury',
    stock: 12,
  },
  {
    name: 'Seamaster Diver 300M',
    description: '42mm ceramic bezel, wave dial. Co-Axial Master Chronometer. 300m water resistance.',
    price: 5600,
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600',
    category: 'sport',
    stock: 15,
  },
  {
    name: 'Tank Must',
    description: 'Classic rectangular design. Steel case, silver dial. Quartz. Timeless elegance.',
    price: 2850,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600',
    category: 'classic',
    stock: 20,
  },
  {
    name: 'Day-Date 40',
    description: 'President bracelet, 40mm 18K yellow gold. Day and date display. Rolex caliber 3255.',
    price: 38500,
    image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?w=600',
    category: 'luxury',
    stock: 2,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('Sample products seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedProducts();
