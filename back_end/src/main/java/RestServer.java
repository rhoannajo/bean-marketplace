import pointofsale.ListingService;
import server.Server;

import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

import static spark.Spark.*;

public class RestServer {
    public static void main(String[] args){
         // react has a proxy from 3000 -> 1234
        port(1234);

        // put this before get handlers
        webSocket("/ws", WebSocketHandler.class);

        // Your Handlers go here
        get("/", (req, res) -> "Hello World");

        RestServer instance = new RestServer();
        instance.runServer();
    }

    public String processRequest(String request){
        // parsing the request to get the url, between the HTTP method and the protocol
        String[] reqUrl = request.split("POST |GET |PUT |HEAD |DELETE |PATCH |OPTIONS | HTTP", 3);
        // parsing the request line by line to get 9th line, the body
        String[] reqBody = request.split("\n");
        String url = reqUrl[0];
        if (reqUrl.length > 1) url = reqUrl[1];
        String body = reqBody[reqBody.length-1];
        if (reqBody.length<9) body = "";
        return ListingService.getInstance().restApi(url, body);
    }

    public void runServer() {
        ServerSocket ding;
        Socket socket = null;
        try {
            ding = new ServerSocket(1299);
            System.out.println("Opened socket " + 1299);
            while (true) {
                // keeps listening for new clients, one at a time
                try {
                    socket = ding.accept(); // waits for client here
                    System.out.println("waiting");
                } catch (IOException e) {
                    System.out.println("Error opening socket");
                    System.exit(1);
                }

                InputStream stream = socket.getInputStream();

                int c;
                String raw = "";
                do {
                    c = stream.read();
                    raw+=(char)c;
                } while(stream.available()>0);
                BufferedOutputStream out = new BufferedOutputStream(socket.getOutputStream());
                PrintWriter writer = new PrintWriter(out, true);  // char output to the client
                // every response will always have the status-line, date, and server name
                writer.println("HTTP/1.1 200 OK");
                writer.println("Server: TEST");
                writer.println("Connection: close");
                writer.println("Content-type: application/json");
                writer.println("");
                // response body
                writer.println(processRequest(raw));
                socket.close();
            }
        } catch (IOException e) {
            System.out.println("Error opening socket");
            System.exit(1);
        }
    }
}
