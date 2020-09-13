exports.insertLibSearches = async (client, libName) => {
  if (!libName) return;

  const db = process.env.ISSUES_DB;
  const collection = process.env.LIB_SEARCHES_COLLECTION;

  const document = {
    name: libName,
    searchDate: new Date(Date.now()),
  }

  try {  
    const result = await client
      .db(db)
      .collection(collection)
      .insertOne(document);
  
    return result;
  } catch (err) {
    console.log('Insert lib search error', err);
    throw err;
  }
};