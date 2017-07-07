export class Spell {

  // display "burn" strings
  public displayCooldown: string;
  public displayRange: string;
  public displayCost: string;
  public displayEffect: Array<string>;

  public cooldown: Array<number>;
  public key: string;
  public name: string;
  public resource: string; // might not need resource
  public maxrank: number;


  public leveltip: any;

  public cost;
  public costType;
  public sanitizedDescription;
  public sanitizedTooltip;
  public range;

  public effect: any; // Array<Array<string>>;
  public vars;

  constructor(spell) {

    this.displayCooldown = spell.cooldownBurn;
    this.displayRange = spell.rangeBurn;
    this.displayCost = spell.costBurn;
    this.displayEffect = spell.effectBurn;

    this.cooldown = spell.cooldown;
    this.key = spell.key;
    this.name = spell.name;
    this.resource = spell.resource; // might not need resource;
    this.maxrank = spell.maxrank;
    this.leveltip = spell.leveltip;
    this.cost = spell.cost;
    this.costType = spell.costType;
    this.sanitizedDescription = spell.sanitizedDescription;
    this.sanitizedTooltip = spell.sanitizedTooltip;

    this.effect = spell.effect;
    this.vars = spell.vars;
  }

  // fn process leveltip

}
