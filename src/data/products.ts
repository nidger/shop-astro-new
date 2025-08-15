// --- Single Source of Truth for Product Data ---

import bucketHat from '../assets/bucket-hat.jpg';
import beachTowel from '../assets/beach-towel.jpg';
import tiedyeShirt from '../assets/tiedye-shirt.jpg';
import blueHoodie from '../assets/blue-hoodie.jpg';
import stickerPack from '../assets/sticker-pack.jpg';
import astroCap from '../assets/astro-cap.jpg';

export const allProducts = [
  { id: "1", slug: "embroidered-astro-bucket-hat", collectionId: "summer", image: bucketHat, title: "Embroidered Astro Bucket Hat", price: "$30.00", colors: ["#F5F5DC", "#FFB6C1", "#F0E68C"] },
  { id: "2", slug: "astro-striped-beach-towel", collectionId: "summer", image: beachTowel, title: "Astro Striped Beach Towel", price: "$35.00" },
  { id: "3", slug: "oversized-interplanetary-astro-t-shirt", collectionId: "summer", image: tiedyeShirt, title: "Oversized Interplanetary Astro T-Shirt", price: "$34.00" },
  { id: "4", slug: "oversized-astral-patches-tie-dye-t-shirt", collectionId: "summer", image: tiedyeShirt, title: "Oversized Astral Patches Tie-Dye T-Shirt", price: "$38.00" },
  { id: "5", slug: "astronaut-blue-zip-up-hoodie", collectionId: "apparel", image: blueHoodie, title: "Astronaut Blue Zip-up Hoodie", price: "$45.00" },
  { id: "6", slug: "astro-pride-embroidered-hoodie", collectionId: "apparel", image: blueHoodie, title: "Astro Pride Embroidered Hoodie", price: "$50.00" },
  { id: "7", slug: "houston-sticker-sheet", collectionId: "stickers", image: stickerPack, title: "Houston Sticker Sheet", price: "$8.00" },
  { id: "8", slug: "holographic-astronaut-sticker-pack", collectionId: "stickers", image: stickerPack, title: "Holographic Astronaut Sticker Pack", price: "$8.00" },
  { id: "9", slug: "astro-icon-t-shirt", collectionId: "apparel", image: tiedyeShirt, title: "Astro Icon T-Shirt", price: "$24.00" },
  { id: "10", slug: "happy-houston-organic-cap", collectionId: "apparel", image: astroCap, title: "Happy Houston Organic Cap", price: "$30.00" },
  { id: "11", slug: "classic-astro-logo-hat", collectionId: "apparel", image: astroCap, title: "Classic Astro Logo Hat", price: "$25.00" },
  { id: "12", slug: "astro-houstodex-grid-t-shirt", collectionId: "apparel", image: tiedyeShirt, title: "Astro Houstodex Grid T-Shirt", price: "$26.00" }
];

export const collections = [
    { id: "summer", title: "Summer 2025", image: bucketHat },
    { id: "apparel", title: "Apparel", image: blueHoodie },
    { id: "stickers", title: "Stickers", image: stickerPack }
];