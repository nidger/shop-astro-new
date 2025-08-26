import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { allProducts } from '@/data/products';
import { colorOptions } from '@/data/variants';

export const prerender = false;

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const { items: cartItems } = await request.json();

    if (!cartItems || !Array.isArray(cartItems)) {
      return new Response('Invalid cart items', { status: 400 });
    }

    const formatSize = (size: string) => {
      switch (size.toUpperCase()) {
        case 'S':
          return 'Small';
        case 'M':
          return 'Medium';
        case 'L':
          return 'Large';
        default:
          return size;
      }
    };

    const line_items = cartItems.map(cartItem => {
      const product = allProducts.find(p => p.id === cartItem.id);
      if (!product) {
        throw new Error(`Product with id ${cartItem.id} not found`);
      }
      const priceInCents = parseFloat(product.price.substring(1)) * 100;
      
      // Look up color name from the color key
      const colorName = cartItem.color ? colorOptions[cartItem.color]?.name : null;
      // Format size name
      const sizeName = cartItem.size ? formatSize(cartItem.size) : null;

      // Construct the final product name with variants
      let name = product.title;
      if (sizeName) name += ` - ${sizeName}`;
      if (colorName) name += ` (${colorName})`;

      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: name,
          },
          unit_amount: priceInCents,
        },
        quantity: cartItem.quantity,
      };
    });

    const cancel_url = request.headers.get('referer') || `${request.headers.get('origin')}/`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url,
      shipping_address_collection: {
        // Add the two-letter ISO country codes for all countries you ship to.
        allowed_countries: ['GB', 'IE'],
      },
      // This adds a simple flat-rate shipping fee. For more complex, location-based rates,
      // create them in your Stripe Dashboard and pass the `shipping_rate` IDs here instead.
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
              amount: 499,
              currency: 'gbp',
            },
            display_name: 'Standard Shipping',
          },
        },
      ],
    });

    if (session.url) {
      return new Response(JSON.stringify({ url: session.url }), { status: 200 });
    }
    return new Response('Error creating checkout session', { status: 500 });

  } catch (error) {
    console.error('--- Checkout API Error ---');
    console.error(error);
    return new Response('Failed to create checkout session', { status: 500 });
  }
};