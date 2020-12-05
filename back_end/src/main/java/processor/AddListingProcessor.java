package processor;

import com.google.gson.Gson;
import dao.ListingDao;
import dto.ListingDto;
import dto.ResponseDto;
import java.util.Date;
import parser.ParsedUrl;

public class AddListingProcessor implements Processor{

    private static Gson gson = new Gson();

    @Override
    public ResponseDto process(ParsedUrl parsedUrl, String body) {
        ListingDto dto = gson.fromJson(body, ListingDto.class);
        ListingDao listingDao = ListingDao.getInstance();
        listingDao.put(dto);
        return new ResponseDto(new Date(), listingDao.getItems(), Boolean.TRUE);
    }
}
