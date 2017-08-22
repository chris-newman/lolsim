export class Rune {

  public id: number;
  public name: string;
  public sanitizedDescription: string;
  public tier;
  public type;

  public image: Object;
  public tags: Object;
  public stats: Object;

  constructor(rune: any) {
    this.id = rune.id;
    this.name = rune.name;
    this.sanitizedDescription = rune.sanitizedDescription;

    this.image = rune.image;
    this.tier = rune.rune.tier;
    this.type = rune.rune.type;
    this.tags = rune.tags;
    this.stats = rune.stats;
  }
}
