package processor;

import com.google.gson.*;
//import com.sun.tools.javac.util.List;
import dao.DataAccessObject;
import dao.ListingDao;
import dto.ListingDto;
import dto.ResponseDto;

import java.util.*;

import parser.ParsedUrl;

public class AddListingProcessor implements Processor{

  private static Gson gson = new Gson();

  @Override
  public ResponseDto process(ParsedUrl parsedUrl, String body) {
    ListingDao lDao = ListingDao.getInstance();
    ListingDto lDto = gson.fromJson(body, ListingDto.class);
    List<ListingDto> list = new ArrayList<>();
    list.add(lDao.put(lDto));
    return new ResponseDto(new Date(), list, true);
  }
}
