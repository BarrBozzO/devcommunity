let env = process.env.NODE_ENV;

if (env == "development" || env == "test") {
  const cfg = require("./config.json");
  const envCfg = cfg[env];
  Object.keys(envCfg).forEach(key => {
    process.env[key] = envCfg[key];
  });
}
