import { LolsimPage } from './app.po';

describe('lolsim App', () => {
  let page: LolsimPage;

  beforeEach(() => {
    page = new LolsimPage();
  });

  it('should display navbar with app title', () => {
    page.navigateTo();
    expect<any>(page.getParagraphText()).toEqual('LOLSIM');
  });
});
