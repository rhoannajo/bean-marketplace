package processor;

import parser.ParsedUrl;

public class ProcessorFactory {

  public Processor getProcessor(ParsedUrl parsedUrl){
    String parts[] = parsedUrl.getPath().split("/\\?");
    String path = parts[0];
    switch (path){
      case "/api/createListing":
        return new AddListingProcessor();
      case "/api/viewListings":
        if(parsedUrl.hasQueryArgs()){
          return new FilterProcessor();
        }else{
          return new ViewListingsProcessor();
        }
      case "/api/deleteListing":
        return new DeleteListingProcessor();
      case "/api/editListing":
        return new EditListingProcessor();
      default:
        return new ErrorProcessor();
    }
  }
}
