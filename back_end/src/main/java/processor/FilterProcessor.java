package processor;

import dao.ListingDao;
import dto.ListingDto;
import dto.ResponseDto;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import parser.ParsedUrl;

public class FilterProcessor implements Processor{

  @Override
  public ResponseDto process(ParsedUrl parsedUrl, String body) {
    List<ListingDto> list = new ArrayList<>();
    list = ListingDao.getInstance().getItems();

    // if a value is passed, removing all item not of that type
    if (Objects.nonNull(parsedUrl.getValue("description"))) list.removeIf(item -> !item.type.equals(parsedUrl.getValue("description")));

    if (Objects.nonNull(parsedUrl.getValue("type"))) list.removeIf(item -> !item.type.equals(parsedUrl.getValue("type")));

    if (Objects.nonNull(parsedUrl.getValue("price"))) list.removeIf(item -> !item.type.equals(parsedUrl.getValue("price")));

    if (Objects.nonNull(parsedUrl.getValue("title"))) list.removeIf(item -> !item.type.equals(parsedUrl.getValue("title")));

    if (Objects.nonNull(parsedUrl.getValue("entryId"))) list.removeIf(item -> !item.entryId.equals(parsedUrl.getValue("entryId")));

    return new ResponseDto(new Date(), list, true);
  }
}
