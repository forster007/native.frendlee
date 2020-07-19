import axios from 'axios';
import api from '../api';

export function getAddress(postalCode, number) {
  return axios.get(
    `https://api.postcode.eu/nl/v1/addresses/postcode/${postalCode}/${number}`,
    {
      auth: {
        username: 'gSTg8gWvXY232AlT49joT5fdlda0XMHdf1WwWrhRlNO',
        password: 'k2wsJ9RiOwSPdGWafhI1ZQSXYBboRnRYmidRmISISrs8XDq4fE',
      },
    }
  );
}

export function getCustomerAddress(customer_id) {
  return api.get(`/addresses?customer_id=${customer_id}`);
}
