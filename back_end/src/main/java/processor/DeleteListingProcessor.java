package processor;

import dao.ListingDao;
import dto.ResponseDto;
import java.util.Date;
import parser.ParsedUrl;

public class DeleteListingProcessor implements Processor{

    @Override
    public ResponseDto process(ParsedUrl parsedUrl, String body) {
        ListingDao listingDao = ListingDao.getInstance();
        String id = parsedUrl.getValue("id");
        ResponseDto responseDto = new ResponseDto(new Date(), listingDao.getItems(), Boolean.TRUE);
        return responseDto;
    }
}