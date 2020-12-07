package dao;

import com.mongodb.BasicDBObject;
import com.mongodb.Block;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import dto.ListingDto;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

import mongo.MongoConnection;
import org.bson.Document;

public class ListingDao extends MongoDao<ListingDto>
implements DataAccessObject<ListingDto> {

  private static ListingDao instance;

  public void bindCollection(){
    // get collection instance here
    instance.collection = mongoConnection.getCollection("BeanCollection", ListingDto.class);
  }

  public static ListingDao getInstance(){
    if(instance == null){
      instance = new ListingDao(new MongoConnection());
      instance.bindCollection();
    }
    return instance;
  }

  // don't touch this
  public static ListingDao setTestConnection(MongoConnection connection){
    instance = new ListingDao(connection);
    instance.bindCollection();
    return instance;
  }

  ListingDao(MongoConnection connection){
    super(connection);
  }

  @Override
  public ListingDto put(ListingDto item) {
    instance.collection.insertOne(item);
    return item;
  }

  @Override
  public List<ListingDto> getItems() {
    return instance.collection.find().into(new ArrayList<ListingDto>());
  }

  @Override
  public void delete(String id) {
    // use Document to delete single item
    instance.collection.deleteOne(new Document("entryId", id));;
  }

}
