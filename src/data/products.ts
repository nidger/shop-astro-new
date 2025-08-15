// --- Single Source of Truth for Product Data ---

import bucketHat from '../assets/bucket-hat.jpg';
import beachTowel from '../assets/beach-towel.jpg';
import tiedyeShirt from '../assets/tiedye-shirt.jpg';
import blueHoodie from '../assets/blue-hoodie.jpg';
import stickerPack from '../assets/sticker-pack.jpg';
import astroCap from '../assets/astro-cap.jpg';

export const allProducts = [
  { id: "1", collectionId: "summer", image: bucketHat, title: "Embroidered Astro Bucket Hat", price: "$30.00", colors: ["#F5F5DC", "#FFB6C1", "#F0E68C"] },
  { id: "2", collectionId: "summer", image: beachTowel, title: "Astro Striped Beach Towel", price: "$35.00" },
  { id: "3", collectionId: "summer", image: tiedyeShirt, title: "Oversized Interplanetary Astro T-Shirt", price: "$34.00" },
  { id: "4", collectionId: "summer", image: tiedyeShirt, title: "Oversized Astral Patches Tie-Dye T-Shirt", price: "$38.00" },
  { id: "5", collectionId: "apparel", image: blueHoodie, title: "Astronaut Blue Zip-up Hoodie", price: "$45.00" },
  { id: "6", collectionId: "apparel", image: blueHoodie, title: "Astro Pride Embroidered Hoodie", price: "$50.00" },
  { id: "7", collectionId: "stickers", image: stickerPack, title: "Houston Sticker Sheet", price: "$8.00" },
  { id: "8", collectionId: "stickers", image: stickerPack, title: "Holographic Astronaut Sticker Pack", price: "$8.00" },
  { id: "9", collectionId: "apparel", image: tiedyeShirt, title: "Astro Icon T-Shirt", price: "$24.00" },
  { id: "10", collectionId: "apparel", image: astroCap, title: "Happy Houston Organic Cap", price: "$30.00" },
  { id: "11", collectionId: "apparel", image: astroCap, title: "Classic Astro Logo Hat", price: "$25.00" },
  { id: "12", collectionId: "apparel", image: tiedyeShirt, title: "Astro Houstodex Grid T-Shirt", price: "$26.00" }
];

export const collections = [
    { id: "summer", title: "SUMMER 2025", image: bucketHat },
    { id: "apparel", title: "APPAREL", image: blueHoodie },
    { id: "stickers", title: "STICKERS", image: stickerPack }
];