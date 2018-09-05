export class Stats {
  // rito stats
  public armor: number;
  public armorperlevel: number;

  public ad: number;
  public adperlevel: number;
  public adaptivead: number;

  // how did i forget ap? ^_^
  public ap: number;
  public apperlevel: number;
  public adaptiveap: number;

  public as: number;
  public asperlevel: number;
  public attackspeedoffset: number;

  public crit: number;
  public critperlevel: number;

  public hp: number;
  public hpperlevel: number;

  public hpregen: number;
  public hpregenperlevel: number;

  public mp: number;
  public mpperlevel: number;

  public mpregen: number;
  public mpregenperlevel: number;

  public mr: number;
  public mrperlevel: number;

  public aarange: number;
  public movespeed: number;

  // base stats
  public base_armor: number;
  public base_ad: number;
  public base_as: number;
  public base_crit: number;
  public base_hp: number;
  public base_hpregen: number;
  public base_mp: number;
  public base_mpregen: number;
  public base_mr: number;

  // more stats
  public level: number;
  public lifesteal: number;
  public spellvamp: number;
  public flatmrpen: number;
  public percentmrpen: number;
  public flatarmpen: number;
  public percentarmpen: number;

  constructor(
    stats
    // // these values are gotten from rito champ stats
    // armor = 0, armorperlevel = 0, attackdamage = 0, attackdamageperlevel = 0, attackspeedoffset = 0, attackspeedperlevel = 0,
    // mp = 0, mpperlevel = 0, hpregen = 0, hpregenperlevel = 0, attackrange = 0, movespeed = 0, mpregen = 0, mpregenperlevel = 0,
    // crit = 0, critperlevel = 0,
    // spellblock = 0, spellblockperlevel = 0, hp = 0, hpperlevel = 0,
    // // initialize other values with default values
    // level = 1, lifesteal = 0, spellvamp = 0,
    // flatmrpen = 0, percentmrpen = 0, flatarmpen = 0, percentarmpen = 0
  ) {
    // these are not optional
    this.base_armor = stats.armor; // === undefined ? '0' : stats.armor;
    this.armorperlevel = stats.armorperlevel; // === undefined ? '0' : stats.armorperlevel;
    this.base_ad = stats.attackdamage; // === undefined ? '0' : stats.attackdamage;
    this.adperlevel = stats.attackdamageperlevel; // === undefined ? '0' : stats.attackdamageperlevel;
    this.apperlevel = stats.apperlevel; // ???
    this.aarange = stats.attackrange; // === undefined ? '0' : stats.attackrange;
    this.attackspeedoffset = stats.attackspeedoffset;
    this.asperlevel = stats.attackspeedperlevel;
    this.base_crit = stats.crit; // === undefined ? '0' : stats.crit;
    this.critperlevel = stats.critperlevel; // === undefined ? '0' : stats.critperlevel;
    this.base_hp = stats.hp; // === undefined ? '0' : stats.hp;
    this.hpperlevel = stats.hpperlevel; // === undefined ? '0' : stats.hpperlevel;
    this.base_hpregen = stats.hpregen; // === undefined ? '0' : stats.hpregen;
    this.hpregenperlevel = stats.hpregenperlevel; // === undefined ? '0' : stats.hpregenperlevel;
    this.movespeed = stats.movespeed; // === undefined ? '0' : stats.movespeed;
    this.base_mp = stats.mp; // === undefined ? '0' : stats.mp;
    this.mpperlevel = stats.mpperlevel; // === undefined ? '0' : stats.mpperlevel;
    this.base_mpregen = stats.mpregen; // === undefined ? '0' : stats.mpregen;
    this.mpregenperlevel = stats.mpregenperlevel; // === undefined ? '0' : stats.mpregenperlevel;
    this.base_mr = stats.spellblock; // === undefined ? '0' : stats.spellblock;
    this.mrperlevel = stats.spellblockperlevel; // === undefined ? '0' : stats.spellblockperlevel;

    // these are optional and have default values
    this.level = stats.level === undefined ? '1' : stats.level;
    this.lifesteal = stats.lifesteal === undefined ? '0' : stats.lifesteal;
    this.spellvamp = stats.spellvamp === undefined ? '0' : stats.spellvamp;
    this.flatarmpen = stats.flatarmpen === undefined ? '0' : stats.flatarmpen;
    this.percentarmpen = stats.percentarmpen === undefined ? '0' : stats.percentarmpen;
    this.flatmrpen = stats.flatmrpen === undefined ? '0' : stats.flatmrpen;
    this.percentmrpen = stats.percentmrpen === undefined ? '0' : stats.percentmrpen;

    // https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
    this.base_as = +(0.625 / (1 + this.attackspeedoffset)).toFixed(3);

  }

  calculateAS() {
    // this.as = 0.625 / (1 + this.attackspeedoffset);
  }


  levelUpStats() {

    this.level++;
  }

  setLevel(level): void {
    this.level = level;
    // calculate stats: hp, mp, ad, as, armor, regen
    this.hp = this.calcStatAtLevel(this.base_hp, this.hpperlevel, 0);
    this.mp = this.calcStatAtLevel(this.base_mp, this.mpperlevel, 0);
    this.ad = this.calcStatAtLevel(this.base_ad, this.adperlevel, 0);
    this.armor = this.calcStatAtLevel(this.base_armor, this.armorperlevel, 0);
    this.hpregen = this.calcStatAtLevel(this.base_hpregen, this.hpregenperlevel, 0);
    this.mpregen = this.calcStatAtLevel(this.base_mpregen, this.mpregenperlevel, 0);
    this.as = this.calcAsAtLevel(3);
  }

  private calcStatAtLevel(base, growth, decimals, level = this.level) {
    return +(base + this.calcGrowthAtLevel(growth, level)).toFixed(decimals);
  }

  private calcAsAtLevel(decimals, level = this.level) {
    return +(this.base_as + (this.base_as * this.calcGrowthAtLevel(this.asperlevel, level))).toFixed(decimals);
  }

  private calcGrowthAtLevel(growth, level = this.level) {
    return growth * (level - 1) * (0.0685 + 0.0175 * level);
  }
}
