import axios from 'axios';

const baseUrl = 'http://localhost:9000/api'; 
const bmiURL = 'https://smart-body-mass-index-calculator-bmi.p.rapidapi.com';

const axiosInstance = axios.create({
  baseURL: bmiURL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-rapidapi-ua': 'RapidAPI-Playground',
    'x-rapidapi-key': '4b560a6094mshec597a6ddb32e21p1b5152jsn8d7fbe2c87fe',
    'x-rapidapi-host': 'smart-body-mass-index-calculator-bmi.p.rapidapi.com',
  },
});

export async function getAll(url) {
  const { data } = await axios.get(`${baseUrl}/${url}`);

  return data.items;
}

export async function getById(url) {
  const {data} = await axios.get(`${baseUrl}/${url}`);
  return data;
}

export async function getBmi(kg, cm) {
  const { data } = await axiosInstance.get('/api/BMI/metric', {
    params: {
      kg,
      cm,
    },
  });
  return data;
}


export async function save(url, { arg: { id, ...data } }) {
  await axios({
    method: id ? 'PUT' : 'POST',
    url: `${baseUrl}/${url}/${id ?? ''}`,
    data,
  });
}

export const updateById = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios.put(`${baseUrl}/${url}/${id}`, values);
};