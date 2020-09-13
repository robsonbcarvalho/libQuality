const repository = require('../../repository');

exports.getIssueStats = async (dbClient, libName) => {
  try {
    await dbClient.connect();
    const stats = await repository.consolidateIssues(dbClient, libName);
    await repository.insertLibSearches(dbClient, libName);

    return stats.map(item => ({
      lib: item._id,
      issues: item.issues,
      avgAge: Math.round(item.avgAge),
      stdAge: Math.round(item.stdAge),
      ageUnit: 'd',
    }));
  } catch (error) {
    throw error
  } finally {
    await dbClient.close();
  }
}
