package dto;

import java.util.Date;
import java.util.UUID;

public class ListingDto extends BaseDto {

  public  String description;
  public  String type;
  public  Integer price;
  public  String title;
  public  String date;

  public ListingDto(){
    super(UUID.randomUUID().toString()); // if no id specified, creating a random, unique id
  }

  public ListingDto(String id, String description, String type, Integer price, String title, String date) {
    super(id);
    this.description = description;
    this.type = type;
    this.price = price;
    this.title = title;
    this.date = date;
  }

  public ListingDto(String description, String type, Integer price, String title,  String date) {
    super(UUID.randomUUID().toString()); // if no id specified, creating a random, unique id
    this.description = description;
    this.type = type;
    this.price = price;
    this.title = title;
    this.date = date;
  }
}
