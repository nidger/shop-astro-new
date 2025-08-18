import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { allProducts } from '@/data/products';

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

    const line_items = cartItems.map(cartItem => {
      const product = allProducts.find(p => p.id === cartItem.id);
      if (!product) {
        throw new Error(`Product with id ${cartItem.id} not found`);
      }
      const priceInCents = parseFloat(product.price.substring(1)) * 100;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
          },
          unit_amount: priceInCents,
        },
        quantity: 1,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/`,
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