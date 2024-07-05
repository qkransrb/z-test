module.exports = {
  apps: [
    {
      name: "quantfi",
      script: "./server/index.js",
      instances: 0,
      exec_mode: "cluster",
    },
  ],
};
