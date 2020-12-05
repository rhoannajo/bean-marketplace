package processor;

import dao.ListingDao;
import dto.ListingDto;
import dto.ResponseDto;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import parser.ParsedUrl;

public class FilterProcessor implements Processor{

    @Override
    public ResponseDto process(ParsedUrl parsedUrl, String body) {
        ListingDao listingDao = ListingDao.getInstance();
        List<ListingDto> items = listingDao.getItems();

        if(parsedUrl.getValue("description") != null){
            items.removeIf(x -> !x.description.equals(parsedUrl.getValue("description")));
        }
        if(parsedUrl.getValue("type") != null){
            items.removeIf(x -> !x.type.equals(parsedUrl.getValue("type")));
        }
        if(parsedUrl.getValue("title") != null){
            items.removeIf(x -> !x.title.equals(parsedUrl.getValue("title")));
        }
        if(parsedUrl.getValue("price") != null){
            items.removeIf(x -> !x.price.equals(parsedUrl.getValue("price")));
        }
        return new ResponseDto(new Date(), items, Boolean.TRUE);

    }
}
