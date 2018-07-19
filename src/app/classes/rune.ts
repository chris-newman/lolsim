export class Rune {
  public id: number;
  public name: string;
  public key: string;
  public pathId: number;
  public pathName: string;
  public shortDesc: string;
  public longDesc: string;
  public image: Object;

  constructor(rune: any) {
    this.id = rune.id;
    this.name = rune.name;
    this.pathId = rune.pathId;
    this.pathName = rune.pathName;
    this.key = rune.key;
    this.image = rune.icon;
    this.shortDesc = rune.shortDesc;
    this.longDesc = rune.longDesc;
  }
}
