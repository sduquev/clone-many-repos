const { default: axios } = require("axios");

const getRepos = async (url, auth) => {
  const opts = { url, headers: { Authorization: `token ${auth}` } };
  return axios.request(opts).then(({ data }) => data);
};

module.exports = { getRepos };
