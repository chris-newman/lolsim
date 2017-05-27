import { LolsimPage } from './app.po';

describe('lolsim App', () => {
  let page: LolsimPage;

  beforeEach(() => {
    page = new LolsimPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
