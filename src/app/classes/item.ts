export class Item {

  public id: string;
  public name: string;
  public sanitizedDescription: string;
  public gold: Object;
  public maps: Object;
  public tags: Object; // Array<string>
  public recipe: Object;
  public buildsInto: Object;


  constructor(item: any){
  // these are not optional
  this.id = item.id;
  this.name = item.name;
  this.gold = item.gold;

  // these are optional

  }
}
