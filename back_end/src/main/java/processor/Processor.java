package processor;

import dto.ResponseDto;
import parser.ParsedUrl;

public interface Processor {

  public ResponseDto process(ParsedUrl parsedUrl, String body);
}
