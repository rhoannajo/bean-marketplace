import com.google.gson.Gson;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;

@WebSocket
public class WebSocketHandler {

    private static List<String> messages = new Vector<>();
    private static Map<Session, Session> sessionMap = new ConcurrentHashMap<>();

    public static void broadcast(String message) {
        sessionMap.keySet().forEach(session -> {
            try {
                session.getRemote().sendString(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
    @OnWebSocketConnect
    public void connected(Session session) throws IOException {
        sessionMap.put(session, session);
        System.out.println("Client connected");
        Gson gson = new Gson();
        // tests we can see messages
        session.getRemote().sendString(gson.toJson(messages));
    }

    @OnWebSocketClose
    public void closed(Session session, int statusCode, String reason){
        // clears session
        sessionMap.remove(session);
        System.out.println("Client disconnected!");
    }

    @OnWebSocketMessage
    public void message(Session session, String message){
        System.out.println("Client has sent: " + message);
        // stores messages
        messages.add(message);
        //triggers broadcast
        Gson gson = new Gson();
        broadcast(gson.toJson(messages));
    }

    @OnWebSocketError
    public void error(Session session, Throwable error){
        // shows error
        System.out.println("Error communicating with server: " + error.getMessage());
    }
}
