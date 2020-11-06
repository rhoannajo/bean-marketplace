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

    @OnWebSocketConnect
    public void connected(Session session) throws IOException {
    }

    @OnWebSocketClose
    public void closed(Session session, int statusCode, String reason){
    }

    @OnWebSocketMessage
    public void message(Session session, String message){
    }

    @OnWebSocketError
    public void error(Session session, Throwable error){
    }
}
