# Drop64

Nintendo N64 displayed in a browser window and controlled by a smartphone. Emscripten compiled mupen64plus, ionic app, and socket.io proxy of input. 

You need to bring your own ROM to play, games are not hosted here. 

Note that the controller portion of this app comes in a smartphone flavor too. See damouse/Drop64_App for that version.

## Running

To run on a local computer:

```
npm install
npm start 
```

Go to [localhost:3000/](http://localhost:3000) in your browser and [localhost:3000/controller](http://localhost:3000/controller) on phone. 

To run on a paradrop router:

- Install the chute from [paradrop.org](http://paradrop.org) on your already provisioned router. The chute is called `nintendo64`.
- Connect to the router's WiFi
- Go to [192.168.1.1:3000](http://192.168.1.1:3000) in your browser
- Go to [192.168.1.1:3000/controller](http://192.168.1.1:3000/controller) on your smartphone

## In Progress

- Multiplayer
- Canvas Streaming 
- Lobbies
