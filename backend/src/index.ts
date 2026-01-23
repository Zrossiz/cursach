import { app, cfg, log } from "./app";

app.listen(cfg.APP_ADDRESS, () => {
  log.info(`started on address: ${cfg.APP_ADDRESS}`)
})