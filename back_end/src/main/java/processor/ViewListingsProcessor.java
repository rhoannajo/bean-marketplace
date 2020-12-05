package processor;

import com.google.gson.Gson;
//import com.sun.tools.javac.util.List;
import dao.ListingDao;
import dto.ListingDto;
import dto.ResponseDto;
import java.util.Date;
import parser.ParsedUrl;

public class ViewListingsProcessor implements Processor{

    private static Gson gson = new Gson();

    @Override
    public ResponseDto process(ParsedUrl parsedUrl, String body) {
        ListingDao listingDao = ListingDao.getInstance();
        return new ResponseDto(new Date(), listingDao.getItems(), Boolean.TRUE);
    }
}
