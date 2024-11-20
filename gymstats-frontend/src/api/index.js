import axios from 'axios';

const baseUrl = 'http://localhost:9000/api'; 

export async function getAll(url) {
  const { data } = await axios.get(`${baseUrl}/${url}`);

  return data.items;
}
export async function getById(url) {
  const {data} = await axios.get(`${baseUrl}/${url}`);
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