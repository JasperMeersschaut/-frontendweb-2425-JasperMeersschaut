export default {
  cors: {
    origins: ['https://frontendweb-jaspermeersschaut.onrender.com'],
  },
  auth: {
    jwt: {
      expirationInterval: 7 * 24 * 60 * 60, // s (7 days)
    },
  },
};
