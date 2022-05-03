import Stripe from 'stripe';
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {

  if (req.method === 'POST') {
    const { cartItems } = req.body;
    try {

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                { shipping_rate: 'shr_1KvHSeD5JajjbnaBHTd5s4Se' },
                { shipping_rate: 'shr_1KvHRiD5JajjbnaBIqjNIzzf' },
                { shipping_rate: 'shr_1KvHH0D5JajjbnaB4A0OX8Cp'},
                { shipping_rate: 'shr_1KvHIlD5JajjbnaBNykf6cTe'}
            ],
            line_items: cartItems.map((item) => {
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', 'https://cdn.sanity.io/images/j28ujslj/production/').replace('-png','.png');
                return {
                    price_data: {
                        currency: 'nzd',
                        product_data: {
                            name: item.name,
                            images: [newImage],
                        },
                        unit_amount: item.discountPrice * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity
                }
            }),
                success_url: `${req.headers.origin}/success`,
                cancel_url: `${req.headers.origin}/canceled`,
        }
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}