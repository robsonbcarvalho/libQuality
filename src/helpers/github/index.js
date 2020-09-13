const { getRepo } = require('./repository');
const { getIssues } = require('./issues');
const {
  convertHeadersLinkToArray,
  getTotalPages,
  hasIssuesNextPage
} = require('./utils');

module.exports = {
  getRepo,
  getIssues,
  convertHeadersLinkToArray,
  getTotalPages,
  hasIssuesNextPage,
}
