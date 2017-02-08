import { SvgAnimatorPage } from './app.po';

describe('svg-animator App', function() {
  let page: SvgAnimatorPage;

  beforeEach(() => {
    page = new SvgAnimatorPage();
  });

  xit('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
