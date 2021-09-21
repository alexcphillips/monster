const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const getRandom = (max = 1) => {
  return Math.floor(Math.random() * max);
};

module.exports = {
  sleep,
  getRandom
};
