/* eslint-disable*/

import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51Nlc73SHJAtEl6ZagJxOMJuAqJag5gQeIJQiN48aEd05IuXOmGHb9WZ1E0OQoqCYwzczZmXrps5TZu1wxmlbJhk100qlwAmjLD'
);

export const bookTour = async tourID => {
  try {
    // 1)get checkout-session from API
    const session = await axios(
      `http://localhost:3000/api/v1/bookings/checkout-session/${tourID}`
    );
    // 2)Create checkout form+charge credit card
    await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(tourID, err);
    showAlert('error', err);
  }
};
