exports.convertHeadersLinkToArray = link => {
  return link
    .split(',')
    .map((item) => {
      const [url, rel] = item.split(';');

      return {
        url: url.replace(/</g, '').replace(/>/g, ''),
        rel: rel.replace(/ rel\=/g, '').replace(/"/g, ''),
      };
    });
}

exports.getTotalPages = (recordsCount, pageSize = 100) =>
  Math.ceil(recordsCount/pageSize);

exports.hasIssuesNextPage = (links) => {
  return !!links.find((link) => link.rel === 'next');
}
