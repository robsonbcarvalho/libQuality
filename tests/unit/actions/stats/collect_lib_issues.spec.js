const stats = require('../../../../src/actions/stats');
const repository = require('../../../../src/repository');
const { mockMongoClient } = require('../../../mocks/mongo.mock')
const github = require('../../../../src/helpers/github');

describe('Collect Github data tests', () => {
  const dbClient = mockMongoClient();
  const owner = 'facebook';
  const name = 'react';
  const githubRepositoryData = { open_issues_count: 10 };

  test('should retrieve lib issues from github', async () => {
    const owner = 'facebook';
    const name = 'react';
    const githubIssues = [
      {"url":"https://api.github.com/repos/facebook/react/issues/19802","repository_url":"https://api.github.com/repos/facebook/react","labels_url":"https://api.github.com/repos/facebook/react/issues/19802/labels{/name}","comments_url":"https://api.github.com/repos/facebook/react/issues/19802/comments","events_url":"https://api.github.com/repos/facebook/react/issues/19802/events","html_url":"https://github.com/facebook/react/issues/19802","id":697260109,"node_id":"MDU6SXNzdWU2OTcyNjAxMDk=","number":19802,"title":"Bug: react-hooks/exhaustive-deps reports a casted TypeScript type as a dependency","user":{"login":"alecmolloy","id":4676536,"node_id":"MDQ6VXNlcjQ2NzY1MzY=","avatar_url":"https://avatars1.githubusercontent.com/u/4676536?v=4","gravatar_id":"","url":"https://api.github.com/users/alecmolloy","html_url":"https://github.com/alecmolloy","followers_url":"https://api.github.com/users/alecmolloy/followers","following_url":"https://api.github.com/users/alecmolloy/following{/other_user}","gists_url":"https://api.github.com/users/alecmolloy/gists{/gist_id}","starred_url":"https://api.github.com/users/alecmolloy/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/alecmolloy/subscriptions","organizations_url":"https://api.github.com/users/alecmolloy/orgs","repos_url":"https://api.github.com/users/alecmolloy/repos","events_url":"https://api.github.com/users/alecmolloy/events{/privacy}","received_events_url":"https://api.github.com/users/alecmolloy/received_events","type":"User","site_admin":false},"labels":[{"id":155984160,"node_id":"MDU6TGFiZWwxNTU5ODQxNjA=","url":"https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed","name":"Status: Unconfirmed","color":"d4c5f9","default":false,"description":"A potential issue that we haven't yet confirmed as a bug"}],"state":"open","locked":false,"assignee":null,"assignees":[],"milestone":null,"comments":0,"created_at":"2020-09-10T00:16:27Z","updated_at":"2020-09-10T02:31:32Z","closed_at":null,"author_association":"NONE","active_lock_reason":null,"body":"This bug is likely a very close sibling of https://github.com/facebook/react/issues/19327, only this time it is for casting `as T`. I can't understand the line that fixed it ([this specifically](https://github.com/facebook/react/pull/19316/files#diff-26e3db67655052fb708395a89179543bR546-R549)), but am happy to help write the rest of the PR's tests if someone can help with the fix for this one.\r\n\r\nReact version: 16.13.1 (latest)\r\neslint-plugin-react-hooks version: 4.1.0 (latest)\r\n\r\n## Steps To Reproduce\r\n1. Cast a variable to a type in a hook callback.\r\n\r\nLink to code example:\r\nhttps://codesandbox.io/s/admiring-tharp-cbq0d?file=/src/App.tsx\r\n\r\n```tsx\r\ntype Foo = \"Bar\";\r\n\r\nexport default function App() {\r\n  const callback = React.useCallback(() => {\r\n    // this is the offending line:\r\n    const foo = \"Foo\" as Foo;\r\n    return foo;\r\n  }, []);\r\n  return <div onClick={callback} />;\r\n}\r\n```\r\n\r\n## The current behavior\r\n```\r\nReact Hook React.useCallback has a missing dependency: 'Foo'. Either include it or remove the dependency array.eslintreact-hooks/exhaustive-deps\r\n```\r\n\r\n## The expected behavior\r\nNo error, a type cannot be a dependency. ","performed_via_github_app":null,"owner":"facebook","name":"react"}
    ];

    github.getRepo = jest.fn(() => Promise.resolve(githubRepositoryData));
    github.getTotalPages = jest.fn(() => 1);
    github.getIssues = jest.fn(() => Promise.resolve(githubIssues));
    repository.insertIssues = jest.fn(() => Promise.resolve());
    
    const result = await stats.collectLibIssues(dbClient, owner, name);

    expect(result).toBeDefined();
  });

  test('should return exception', async () => {
    errorMessage = 'Unexpected error';
    github.getRepo = jest.fn(() => Promise.resolve(githubRepositoryData));
    github.getIssues = jest.fn(() => Promise.reject({ message: errorMessage }));

    try {
      await stats.collectLibIssues(dbClient, owner, name);
    } catch (err) {
      expect(err.message).toEqual(errorMessage);
    }
  });
});