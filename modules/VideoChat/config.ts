export const peerOptions = {
  host: process.env.NEXT_PUBLIC_PEERJS_HOST ?? window.location.hostname,
  path: process.env.NEXT_PUBLIC_PEERJS_PATH ?? "/peerjs",
//   port: parseInt(process.env.NEXT_PUBLIC_PEERJS_PORT ?? "9000"),
};
