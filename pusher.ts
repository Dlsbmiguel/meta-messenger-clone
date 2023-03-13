const Pusher = require("pusher");
import ClientPusher from "pusher-js";

const appId = process.env.PUSHER_APP_ID!;
const clientKey = process.env.NEXT_PUBLIC_PUSHER_APP_KEY!;
const secret = process.env.PUSHER_APP_SECRET!;
const cluster = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER!;

export const serverPusher = new Pusher({
  appId: appId,
  key: clientKey,
  secret: secret,
  cluster: cluster,
  useTLS: true,
});

export const clientPusher = new ClientPusher(clientKey, {
  cluster: cluster,
  forceTLS: true,
});
