import axios from 'axios';
import handleDBError from './_handleDBError';
import * as userservice from './user';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export const getBmi = async (userid : number) => {
  try {
    const user = await userservice.getById(userid);
    const response = await axios.get('https://smart-body-mass-index-calculator-bmi.p.rapidapi.com/api/BMI/metric', {
      params: {
        kg: user.weight,
        cm: user.length,
      },
      headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': 'smart-body-mass-index-calculator-bmi.p.rapidapi.com',
        'Host': 'smart-body-mass-index-calculator-bmi.p.rapidapi.com',
      },
    });
    return response.data;
  } catch (error) {
    throw handleDBError(error);
  }
};
