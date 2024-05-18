import { Server } from "socket.io";
import { Client, type Presence } from "discord-rpc";

const server = new Server({
  serveClient: false,
  allowEIO3: true,
});

server.on("connection", (socket) => {
  const rpc = new Client({ transport: "ipc" });

  rpc.login({ clientId: "503557087041683458" });

  socket.on("clearActivity", () => rpc.clearActivity());

  socket.on(
    "setActivity",
    (data: { clientid: string; presenceData: Presence }) => {
      rpc.setActivity(data.presenceData);
    },
  );

  socket.on("getVersion", () => {
    socket.emit("receiveVersion", "2.2.1".replace(/[\D]/g, ""));
  });

  socket.on("disconnect", () => rpc.destroy());
});

server.listen(3020);

console.log("Listening for PreMiD connections on port 3020");
