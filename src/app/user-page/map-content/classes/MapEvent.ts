import {Category} from './Category';

export class MapEvent {
  userId: number;
  eventId: number;
  eventName: String;
  eventDiscription: String;
  // category: String;
  categories: Array<Category>;
  latitude: number;
  longitude: number;
  location: String;
  startEvent: number;
  endEvent: number;

  constructor(eventName: String, eventDiscription: String, latitude: number, longitude: number, location: String,
              startEvent: number, endEvent: number, categories: Array<Category> ) {
    this.eventName = eventName;
    this.eventDiscription = eventDiscription;
    this.latitude = latitude;
    this.longitude = longitude;
    this.location = location;
    this.startEvent = startEvent;
    this.endEvent = endEvent;
    this.categories = categories;

  }
  public setUserId(userId: number) {
    this.userId = userId;
  }
  public setEventId(eventId: number) {
    this.eventId = eventId;
  }

}
