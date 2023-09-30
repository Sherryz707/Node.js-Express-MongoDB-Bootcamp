const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  success_url: `${req.protocol}://${req.get('host')}/`,
  cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
  customer_email: req.user.email,
  client_reference_id: req.params.tourID,
  line_items: [
    {
      price_data: {
        currency: 'usd',
        unit_amount: tour.price * 100,
        product_data: {
          name: `${tour.name} Tour`,
          description: tour.summary,
          images: [`https://www.natours.dev/img/tours/${tour.imageCover}`]
        }
      },
      quantity: 1
    }
  ],
  mode: 'payment'
});
