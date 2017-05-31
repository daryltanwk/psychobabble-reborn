import { PsychoWebPage } from './app.po';

describe('psycho-web App', () => {
  let page: PsychoWebPage;

  beforeEach(() => {
    page = new PsychoWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
