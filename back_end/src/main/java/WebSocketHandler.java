import com.google.gson.Gson;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketClose;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketConnect;
import org.eclipse.jetty.websocket.api.annotations.OnWebSocketMessage;
import org.eclipse.jetty.websocket.api.annotations.WebSocket;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Vector;
import java.util.concurrent.ConcurrentHashMap;

@WebSocket
public class WebSocketHandler {

    private static List<String> messages = new Vector<>();
    private static Map<Session,Session> sessionMap = new ConcurrentHashMap<>();

    public static void broadcast(String message){
        // loop through each active session
        sessionMap.keySet().forEach(session -> {
            try {
                session.getRemote().sendString(message);
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }

    // Trigger when connection opens (And Stays Open)
    @OnWebSocketConnect
    public void connected(Session session) throws IOException {
        sessionMap.put(session, session); // remember all sessions
        System.out.println("A client connected!");
        Gson gson = new Gson();
        // test that we can see messages
        session.getRemote().sendString(gson.toJson(messages));
    }

    @OnWebSocketClose
    public void closed(Session session, int statusCode, String reason){
        sessionMap.remove(session);
        System.out.println("A client disconnected");
    }

    @OnWebSocketMessage
    public void message(Session session, String message){
        messages.add(message);
        System.out.println("Client sent: " + message);
        Gson gson = new Gson();
        broadcast(gson.toJson(messages));
    }
}
