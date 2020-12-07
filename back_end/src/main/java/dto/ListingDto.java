package dto;

import java.util.UUID;

public class ListingDto extends BaseDto {

  public  String description;
  public  String type;
  public  Integer price;
  public  String title;

  public ListingDto(){
    super(UUID.randomUUID().toString()); // if no id specified, creating a random, unique id
  }

  public ListingDto(String id, String description, String type, Integer price, String title) {
    super(id);
    this.description = description;
    this.type = type;
    this.price = price;
    this.title = title;
  }

  public ListingDto(String description, String type, Integer price, String title) {
    super(UUID.randomUUID().toString()); // if no id specified, creating a random, unique id
    this.description = description;
    this.type = type;
    this.price = price;
    this.title = title;
  }
}
