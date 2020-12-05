package dao;

import dto.BaseDto;
import dto.ListingDto;

import java.util.ArrayList;
import java.util.List;
import mongo.MongoConnection;
import org.bson.Document;

public class ListingDao extends MongoDao<ListingDto> implements DataAccessObject<ListingDto>{


    private static ListingDao instance;


    public void bindCollection(){
        // get collection instance here
        collection = mongoConnection.getCollection("Name", BaseDto.class);
    }

    public static ListingDao getInstance(){
        if(instance == null){
            instance = new ListingDao(new MongoConnection());
            instance.bindCollection();
        }
        return instance;
    }

    ListingDao(MongoConnection connection){
        super(connection);
    }

    @Override
    public ListingDto put(ListingDto item) {
        collection.insertOne(item);
        return item;
    }

    @Override
    public List<ListingDto> getItems() {
        return collection.find().into(new ArrayList<>());
    }

    @Override
    public void delete(String id) {
        collection.deleteOne(new Document("entryId", id));
    }

}
