import { Rune } from './rune';
import { RunePath } from './rune-path';

// data structure to be used in build
export class RuneSet {
  private majorPath: RunePath;
  private majorKeySlot: Rune;
  private majorFirstSlot: Rune;
  private majorSecondSlot: Rune;
  private majorThirdSlot: Rune;

  private minorPath: RunePath;
  private minorFirstSlot: Rune;
  private minorSecondSlot: Rune;

  // major path functions
  setMajorPath(runePath: RunePath) {}
  getMajorPath(): RunePath {
    return this.majorPath;
  }
  setMajorKeySlot(rune: Rune) {}
  setMajorFirstSlot(rune: Rune) {}
  setMajorSecondSlot(rune: Rune) {}
  setMajorThirdSlot(rune: Rune) {}


  // minor path functions
  setMinorPath(runePath: RunePath) {}
  setMinorFirstSlot(rune: Rune) {}
  setMinorSecondSlot(rune: Rune) {}

  // validation functions
  validateMajorFirstSlot() {}

  validateMajorSecondSlot() {}

  validateMajorThirdSlot() {}
}
