export class Item {

  public id: string;
  public name: string;
  public sanitizedDescription: string;
  public gold: any;
  public maps: Object;
  public tags: Array<String>;  // Array<string>
  public recipe: Object;
  public stats: Object;
  public maxStacks: number;
  public currentStacks: number;
  public buildsInto: Object;

  constructor(item: any) {
    this.id = item.id;
    this.name = item.name;
    this.gold = item.gold;
    this.sanitizedDescription = item.sanitizedDescription;
    this.tags = item.tags;
    this.maps = item.maps;
    this.stats = item.stats;
    this.buildsInto = item.into;
    this.maxStacks = item.stacks;
    this.currentStacks = 0;
  }
}
