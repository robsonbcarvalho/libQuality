exports.insertIssues = async (client, issues, name) => {
  const db = process.env.ISSUES_DB;
  const collection = process.env.ISSUES_COLLECTION;

  try {
    await client
      .db(db)
      .collection(collection)
      .deleteMany({ name: name });
  
    const result = await client
      .db(db)
      .collection(collection)
      .insertMany(issues);
  
    return result;
  } catch (err) {
    console.log('Insert issues error', err);
    throw err;
  }
};