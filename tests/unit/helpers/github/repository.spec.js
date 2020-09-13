const axiosInstance = require('axios');
const github = require('../../../../src/helpers/github');

describe('Helpers tests', () => {
    describe('Get Github Repository', () => {
      const owner = 'facebook';
      const name = 'react';
    test('should retrieve github repository data', async () => {
      const data = { lib: 'react' };
      const responseMock = {
        data,
        status: 200,
        headers: {}
      };

      axiosInstance.get = jest.fn(() => Promise.resolve(responseMock));

      const result = await github.getRepo(axiosInstance, owner, name);
      expect(result).toEqual(data);
    });

    test('should return error', async () => {
      const errorMessage = 'Error retrieving Github repository';
      axiosInstance.get = jest.fn(() => Promise.reject(
        { errorMessage }
      ));

      try {
        await github.getRepo(axiosInstance, owner, name);
      } catch (err) {
        expect(err.message).toEqual(errorMessage);
      }
    });
  });
});