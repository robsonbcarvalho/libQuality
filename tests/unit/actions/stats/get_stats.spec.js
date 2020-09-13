const stats = require('../../../../src/actions/stats');
const repository = require('../../../../src/repository');
const { mockMongoClient } = require('../../../mocks/mongo.mock')

describe('Stats actions tests', () => {
  const dbClient = mockMongoClient();

  test('should get the consolidate statistics', async () => {
    const data = [
      { _id: 'React', issues: 10, avgAge: 20, stdAge: 12 },
      { _id: 'Vue', issues: 7, avgAge: 10, stdAge: 8 }, 
    ];

    repository.consolidateIssues = jest.fn(() => Promise.resolve(data));
    repository.insertLibSearches = jest.fn(() => Promise.resolve({}));

    const result = await stats.getIssueStats(dbClient);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBeTruthy();
  });

  test('should get response error', async () => {
    repository.consolidateIssues = jest.fn(() => Promise.reject({ message: 'Error' }));

    try {
      await stats.getIssueStats(dbClient);
    } catch (err) {
      expect(err.message).toEqual('Error');
    }
  });
});