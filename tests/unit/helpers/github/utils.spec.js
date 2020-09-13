const utils = require('../../../../src/helpers/github');
const github = require('../../../../src/helpers/github');

describe('Helpers tests', () => {
  test('should convert header text into array', () => {
    const headerLinkText = '<https://api.github.com/repositories/10270250/issues?state=open&page=1&per_page=100>; rel="prev", <https://api.github.com/repositories/10270250/issues?state=open&page=3&per_page=100>; rel="next", <https://api.github.com/repositories/10270250/issues?state=open&page=6&per_page=100>; rel="last", <https://api.github.com/repositories/10270250/issues?state=open&page=1&per_page=100>; rel="first"';
    const result = utils.convertHeadersLinkToArray(headerLinkText);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });

  test('should check if has next page to fetch', () => {
    const links = [
      {
        url: 'https://api.github.com/repositories/10270250/issues?state=open&page=1&per_page=100',
        rel: 'prev'
      },
      {
        url: ' https://api.github.com/repositories/10270250/issues?state=open&page=3&per_page=100',
        rel: 'next'
      },
      {
        url: ' https://api.github.com/repositories/10270250/issues?state=open&page=6&per_page=100',
        rel: 'last'
      },
      {
        url: ' https://api.github.com/repositories/10270250/issues?state=open&page=1&per_page=100',
        rel: 'first'
      }
    ];
    const result = utils.hasIssuesNextPage(links);
    expect(result).toBeTruthy();
  });

  test('should get the number of pages', () => {
    const recordsCount = 55;
    const pageSize = 10;
    const expectedTotalPages = 6;

    const result = github.getTotalPages(recordsCount, pageSize);
    expect(result).toEqual(expectedTotalPages);
  });

  test('should get the number of pages without pass pageSize parameter', () => {
    const recordsCount = 55;
    const expectedTotalPages = 1;

    const result = github.getTotalPages(recordsCount);
    expect(result).toEqual(1);
  });
});