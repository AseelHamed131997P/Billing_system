const { REACT_APP_GATEWAY = "http://localhost:80/" } = process.env;

const config = {
  api: {
    endpoint: REACT_APP_GATEWAY,
  },
};

export default config;
