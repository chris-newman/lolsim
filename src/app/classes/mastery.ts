export class Mastery {

  public id: number;
  public name: string;
  public sanitizedDescription: Array<string>;
  public tree: string;
  public prereq: Object;
  // TO DO: decide whether or not image is actually needed, or if src is just id+'.png'
  public image: Object;


  constructor(mastery: any) {
    this.id = mastery.id;
    this.name = mastery.name;
    this.sanitizedDescription = mastery.sanitizedDescription;
    this.image = mastery.image;
    this.tree = mastery.masteryTree;
  }
}
