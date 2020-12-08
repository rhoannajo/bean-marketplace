package processor;

import com.google.gson.Gson;
import dao.ListingDao;
import dto.ListingDto;
import dto.ResponseDto;
import parser.ParsedUrl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EditListingProcessor implements Processor {
    private static Gson gson = new Gson();

    @Override
    public ResponseDto process(ParsedUrl parsedUrl, String body) {
        // get id, delete and replace/add into same list
        ListingDao lDao = ListingDao.getInstance();
        lDao.delete(parsedUrl.getValue("id"));
        ListingDto lDto = gson.fromJson(body, ListingDto.class);
        List<ListingDto> list = new ArrayList<>();
        list.add(lDao.put(lDto));
        return new ResponseDto(new Date(), list, true);
    }
}
