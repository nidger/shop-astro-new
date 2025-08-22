// --- Single Source of Truth for Product Data ---

import bucketHat from '../assets/bucket-hat.jpg';
import beachTowel from '../assets/beach-towel.jpg';
import tiedyeShirt from '../assets/tiedye-shirt.jpg';
import blueHoodie from '../assets/blue-hoodie.jpg';
import stickerPack from '../assets/sticker-pack.jpg';
import astroCap from '../assets/astro-cap.jpg';

export const allProducts = [
  { id: "1", slug: "embroidered-astro-bucket-hat", collectionId: "summer", title: "Embroidered Astro Bucket Hat", price: "$30.00", colors: ["#F5F5DC", "#FFB6C1", "#F0E68C"], images: [{src: bucketHat, alt: "Embroidered Astro Bucket Hat"}, {src: beachTowel, alt: "Embroidered Astro Bucket Hat"}, {src: tiedyeShirt, alt: "Embroidered Astro Bucket Hat"}] },
  { id: "2", slug: "astro-striped-beach-towel", collectionId: "summer", title: "Astro Striped Beach Towel", price: "$35.00", images: [{src: beachTowel, alt: "Astro Striped Beach Towel"}] },
  { id: "3", slug: "oversized-interplanetary-astro-t-shirt", collectionId: "summer", title: "Oversized Interplanetary Astro T-Shirt", price: "$34.00", images: [{src: tiedyeShirt, alt: "Oversized Interplanetary Astro T-Shirt"}] },
  { id: "4", slug: "oversized-astral-patches-tie-dye-t-shirt", collectionId: "summer", title: "Oversized Astral Patches Tie-Dye T-Shirt", price: "$38.00", images: [{src: tiedyeShirt, alt: "Oversized Astral Patches Tie-Dye T-Shirt"}] },
  { id: "5", slug: "astronaut-blue-zip-up-hoodie", collectionId: "apparel", title: "Astronaut Blue Zip-up Hoodie", price: "$45.00", images: [{src: blueHoodie, alt: "Astronaut Blue Zip-up Hoodie"}] },
  { id: "6", slug: "astro-pride-embroidered-hoodie", collectionId: "apparel", title: "Astro Pride Embroidered Hoodie", price: "$50.00", images: [{src: blueHoodie, alt: "Astro Pride Embroidered Hoodie"}] },
  { id: "7", slug: "houston-sticker-sheet", collectionId: "stickers", title: "Houston Sticker Sheet", price: "$8.00", images: [{src: stickerPack, alt: "Houston Sticker Sheet"}] },
  { id: "8", slug: "holographic-astronaut-sticker-pack", collectionId: "stickers", title: "Holographic Astronaut Sticker Pack", price: "$8.00", images: [{src: stickerPack, alt: "Holographic Astronaut Sticker Pack"}] },
  { id: "9", slug: "astro-icon-t-shirt", collectionId: "apparel", title: "Astro Icon T-Shirt", price: "$24.00", images: [{src: tiedyeShirt, alt: "Astro Icon T-Shirt"}] },
  { id: "10", slug: "happy-houston-organic-cap", collectionId: "apparel", title: "Happy Houston Organic Cap", price: "$30.00", images: [{src: astroCap, alt: "Happy Houston Organic Cap"}] },
  { id: "11", slug: "classic-astro-logo-hat", collectionId: "apparel", title: "Classic Astro Logo Hat", price: "$25.00", images: [{src: astroCap, alt: "Classic Astro Logo Hat"}] },
  { id: "12", slug: "astro-houstodex-grid-t-shirt", collectionId: "apparel", title: "Astro Houstodex Grid T-Shirt", price: "$26.00", images: [{src: tiedyeShirt, alt: "Astro Houstodex Grid T-Shirt"}] }
];

export const collections = [
    { id: "summer", title: "Summer 2025", image: allProducts.find(p => p.id === '1').images[0].src },
    { id: "apparel", title: "Apparel", image: allProducts.find(p => p.id === '5').images[0].src },
    { id: "stickers", title: "Stickers", image: allProducts.find(p => p.id === '7').images[0].src }
];
