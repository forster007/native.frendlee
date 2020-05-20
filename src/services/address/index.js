import axios from 'axios';

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
