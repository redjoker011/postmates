const WebSocket = require("ws");

function connect(id) {
  console.log(`Courier ${id} initating a connection ... `);
  let ws = new WebSocket(`ws://localhost:8080/v1/courier/realtime/${id}`);

  ws.on("open", (e) => {
    console.log("connection successful");

    setInterval(() => {
      ws.send(
        JSON.stringify({
          meta: {
            type: "LocationUpdate",
          },
          id: id,
          latitude: 5.688153174273126,
          longitude: -0.24204731120789802,
        })
      );
    }, 2000);
  });

  ws.on("message", function (data) {
    console.log("Location Indexed", data);
  });

  ws.on("error", function (data) {
    console.log("Error connecting");
  });
}

function main() {
  connect(process.argv[2]);
}

main();
