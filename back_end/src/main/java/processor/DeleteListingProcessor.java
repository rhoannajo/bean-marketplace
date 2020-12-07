package processor;

import dao.ListingDao;
import dto.ResponseDto;
import java.util.ArrayList;
import java.util.Date;
import mongo.MongoConnection;
import parser.ParsedUrl;

public class DeleteListingProcessor implements Processor{

  @Override
  public ResponseDto process(ParsedUrl parsedUrl, String body) {
    ListingDao lDao = ListingDao.getInstance();
    lDao.delete(parsedUrl.getValue("id"));
    return new ResponseDto(new Date(), new ArrayList(), true);
  }
}