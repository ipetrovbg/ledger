import { LedgerPage } from './app.po';

describe('ledger App', () => {
  let page: LedgerPage;

  beforeEach(() => {
    page = new LedgerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
