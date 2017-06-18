import { MiracleListClientPage } from './app.po';

describe('miracle-list-client App', () => {
  let page: MiracleListClientPage;

  beforeEach(() => {
    page = new MiracleListClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
