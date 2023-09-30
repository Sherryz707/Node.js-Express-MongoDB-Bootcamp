/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';

export const login = async (email, password) => {
  try {
    console.log(email, password);
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    // console.log(res);
  } catch (err) {
    // console.log(err, err.response.data);
  }
};
export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout'
    });
    // express can't do it, so we do it manually
    if ((res.data.status = 'success')) {
      // reload from server not cache as else it would load our user view
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
