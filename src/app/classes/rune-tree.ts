import { RunePath } from './rune-path';

// data structure to capture all rune reforged data and provide convenience functions for accessing it
// TODO: decide whether or not this should really be a service instead, and use rune path as the data struct
export class RuneTree {
  public runePaths: Array<RunePath>;

  constructor(runePaths) {
    this.runePaths = runePaths;
  }

  public getRunePaths() {
    return this.runePaths;
  }
}
