export class Spell {

  // display "burn" strings
  public displayCooldown: string;
  public displayRange: string;
  public displayCost: string;
  public effectStrings: Array<string>;

  public cooldown: Array<number>;
  public key: string;
  public name: string;
  public resource: string; // might not need resource
  public maxrank: number;


  public leveltip: any;

  public cost;
  public costType;
  public baseDescription;
  public baseTooltip;
  public displayTooltip;
  public range;

  public effect: any; // Array<Array<string>>;
  public vars;

  constructor(spell) {

    this.displayCooldown = spell.cooldownBurn;
    this.displayRange = spell.rangeBurn;
    this.displayCost = spell.costBurn;
    this.effectStrings = spell.effectBurn;

    this.cooldown = spell.cooldown;
    this.key = spell.key;
    this.name = spell.name;
    this.resource = spell.resource; // might not need resource;
    this.maxrank = spell.maxrank;
    this.leveltip = spell.leveltip;
    this.cost = spell.cost;
    this.costType = spell.costType;
    this.baseDescription = spell.sanitizedDescription;
    this.baseTooltip = spell.sanitizedTooltip;
    this.displayTooltip = spell.sanitizedTooltip;

    this.effect = spell.effect;
    this.vars = spell.vars;
  }

  // fn process leveltip

}
