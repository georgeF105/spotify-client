import { SpotifyClientPage } from './app.po';

describe('spotify-client App', function() {
  let page: SpotifyClientPage;

  beforeEach(() => {
    page = new SpotifyClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
