const axiosInstance = require('axios');
const github = require('../../../../src/helpers/github');

describe('Helpers tests', () => {
    describe('Get Github Issues', () => {
      const owner = 'facebook';
      const name = 'react';
      page = 1;
      pageSize = 10;
      issuesState = 'open';
  
    test('should retrieve github repository´s issues', async () => {
      const data = [{ lib: 'react' }];
      const responseMock = {
        data,
        status: 200,
        headers: {}
      };

      axiosInstance.get = jest.fn(() => Promise.resolve(responseMock));

      const result = await github.getIssues(
        axiosInstance,
        owner,
        name,
        page,
        pageSize,
        issuesState
      );

      expect(result).toEqual(data);
    });

    test('should return error', async () => {
      const errorMessage = 'Error retrieving repository issues';
      axiosInstance.get = jest.fn(() => Promise.reject(
        { errorMessage }
      ));

      try {
        await github.getIssues(
          axiosInstance,
          owner,
          name,
          page,
          pageSize,
          issuesState
        );
      } catch (err) {
        expect(err.message).toEqual(errorMessage);
      }
    });
  });
});