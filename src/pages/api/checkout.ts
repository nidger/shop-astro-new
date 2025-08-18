import type { APIRoute } from 'astro';
import Stripe from 'stripe';
import { allProducts } from '@/data/products';

const stripe = new Stripe(import.meta.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
});

export const POST: APIRoute = async ({ request }) => {
  const cartItems = await request.json();

  if (!cartItems || !Array.isArray(cartItems)) {
    return new Response(JSON.stringify({ error: 'Invalid cart items' }), { status: 400 });
  }

  try {
    const line_items = cartItems.map(cartItem => {
      const product = allProducts.find(p => p.id === cartItem.id);
      if (!product) {
        throw new Error(`Product with id ${cartItem.id} not found`);
      }
      const priceInCents = parseFloat(product.price.replace('$', '')) * 100;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
            images: [product.image.src], // Note: This needs to be a publicly accessible URL
          },
          unit_amount: priceInCents,
        },
        quantity: 1, // Assuming quantity is 1 for now
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/`,
    });

    return new Response(JSON.stringify({ url: session.url }));

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create checkout session' }), { status: 500 });
  }
};
