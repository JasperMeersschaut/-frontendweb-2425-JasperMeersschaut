import axios from 'axios';
import handleDBError from './_handleDBError';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export const getBmi = async (kg: number, cm: number) => {
  try {
    const response = await axios.get('https://smart-body-mass-index-calculator-bmi.p.rapidapi.com/api/BMI/metric', {
      params: {
        kg,
        cm,
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
