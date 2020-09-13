exports.getIssues = async (
  axiosInstance,
  owner,
  name,
  page,
  pageSize,
  issuesState
) => {
  const url = `/repos/${owner}/${name}/issues`;
  const queryParams = `state=${issuesState}&page=${page}&per_page=${pageSize}`;
  //state
  //since=YYYY-MM-DDTHH:MM:SSZ
  const params = {
    state: issuesState,
    page: page,
    per_page: pageSize,
  }

  try {
    const { data, status, headers } = await axiosInstance
      .get(url, { params });

    return data;
  } catch (err) {
    console.log('Request Error', err);
    return err;
  }

  /* const links = transformHeadersLink(headers.link);
  if (links.find((link) => link.rel === 'next')) {
    //buscar próxima página
  } */
}
