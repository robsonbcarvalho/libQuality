exports.getRepo = async (axiosInstance, owner, name) => {
  const url = `/repos/${owner}/${name}`;

  try {
    const { data, status, headers } = await axiosInstance
      .get(url);

    return data;
  } catch (err) {
    console.log('Request Error', err);
    return err;
  }
}
