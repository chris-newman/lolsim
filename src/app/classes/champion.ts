import { Spell } from 'app/classes/spell';
import { Stats } from 'app/classes/stats';


export class Champion {
  // id: number;
  // key:string;
  // name: string;
  // spells: Spell[];
  // title: string;
  setLevel: any;

  constructor(
    //id: number,
    public key: string,
    public name: string,
    public title: string,
    public passive: any,
    public spells: Array<Spell>,
    public stats: Stats
  ) {
    this.setLevel = this.stats.setLevel;
  }

}
