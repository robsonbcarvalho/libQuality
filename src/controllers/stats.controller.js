const actions = require('../actions/stats');
const repository = require('../repository');

/**
 * Get issues statistics about the libraries
 * @route GET /api/v1/issues
 * @group issues - Operations about issues
 * @operationId retrieveStats
 * @param {string} lib - Lib name to search - eg: react
 * @returns {array.<Stats>} 200 - An array of issues statitics
 * @returns {Error}  default - Unexpected error
 */
exports.getStats = async (req, res) => {
  const { query: { lib = '' } } = req;
 
  try {
    const dbClient = repository.getMongoClient();
    const stats = await actions.getIssueStats(dbClient, lib);

    if (stats.length === 0) {
      return res.status(404).json({ message: 'not found' })
    }

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.collectLibIssues = async (req, res) => {
  const { 
    query: {
        repository_owner: owner,
        repository_name: name
      }
    } = req;

  try {
    const dbClient = repository.getMongoClient();
    const data = await actions.collectLibIssues(dbClient, owner, name);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error });
  }
}
