const axios = require('axios');
const repository = require('../../repository');
const github = require('../../helpers/github');
const axiosInstance = axios.create({ baseURL: process.env.GITHUB_BASE_URL });

const removePullRequestsFromResult = issues => issues
  .filter((issue) => !issue.hasOwnProperty('pull_request'));

exports.collectLibIssues = async (dbClient, owner, name) => {
  const pageSize = 100;
  const issuesState = 'open';

  try {
    const repo = await github.getRepo(axiosInstance, owner, name);
    const { open_issues_count: openIssuesCount } = repo;
    const pages = github.getTotalPages(openIssuesCount, pageSize);
    let result = [];

    /*
    refatorar para 
    let getNextPage = true;
    while(getNextPage) {
      if (!github.hasIssuesNextPage(headers.link)) {
        getNextPage = false;
      }
    }*/
    for(let page=1; page <= pages; page++) {
      const issues = await github.getIssues(
        axiosInstance,
        owner,
        name,
        page,
        pageSize,
        issuesState
      );

      result.push(...issues);
    }

    const onlyIssues = removePullRequestsFromResult(result);
    const documents = onlyIssues.map((issue) =>
      Object.assign(issue, { owner: owner, name: name })
    );

    await dbClient.connect();
    await repository.insertIssues(dbClient, documents, name);

    return {
      lib: name,
      openIssues: onlyIssues.length,
    };
  } catch (err) {
    //console.log('Request Error', err);
    return err;
  } finally {
    await dbClient.close();
  }
}
