import axios from 'axios';

export function getAddress(postalCode, number) {
  return axios.get(
    `https://api.postcode.eu/nl/v1/addresses/postcode/${postalCode}/${number}`,
    {
      auth: {
        username: '3865iehQrVuujJ1gY3u6QVJAaNLKI5AgK8eqBUYjnze',
        password: 'JjahzwGx9DVM9PlmduQq2f7pfxxpfeKpGXDjFVcpfLS8nuNmww',
      },
    }
  );
}
