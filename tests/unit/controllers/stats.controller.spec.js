const controller = require('../../../src/controllers/stats.controller');
const actions = require('../../../src/actions/stats');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockUpdateDataRequest = () => {
  return {
    query: {
      repository_owner: 'facebook',
      repository_name: 'react',
    }
  };
};

const mockGetStatusRequest = () => {
  return {
    query: {
      lib: 'react',
    }
  };
};

describe('Stats Controller tests', () => {
  describe('getStats tests', () => {
    const res = mockResponse();

    test('should get success response', async () => {
      const data = [ { lib: 'React' }, { lib: 'Vue'} ];
      const req = mockGetStatusRequest();
      actions.getIssueStats = jest.fn(() => Promise.resolve(data));

      await controller.getStats(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(data);
    });

    test('should get response error with status code 404', async () => {
      const data = [];
      const req = mockGetStatusRequest();
      actions.getIssueStats = jest.fn(() => Promise.resolve(data));

      await controller.getStats(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('should get response error with status code 500', async () => {
      const req = mockGetStatusRequest();
      actions.getIssueStats = jest.fn(() => Promise.reject());

      try {
        await controller.getStats(req, res);
      } catch (err) {
        expect(res.status).toHaveBeenCalledWith(500);
      }
    });
  });

  describe('Collect issues tests', () => {
    const data = [{}];
    const req = mockUpdateDataRequest();
    const res = mockResponse();

    test('should get success response', async () => {
      actions.collectLibIssues = jest.fn(() => Promise.resolve(data));

      await controller.collectLibIssues(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(data);
    });

    test('should get response error with status code 500', async () => {
      const req = mockUpdateDataRequest();
      actions.collectLibIssues = jest.fn(() => Promise.reject());

      try {
        await controller.collectLibIssues(req, res);
      } catch (err) {
        expect(res.status).toHaveBeenCalledWith(500);
      }
    });
  });
});
