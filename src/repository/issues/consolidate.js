const aggregate = [
  {
    '$match': {
      'state': 'open'
    }
  }, {
    '$addFields': {
      'age': {
        '$trunc': {
          '$divide': [
            {
              '$subtract': [
                new Date(), {
                  '$toDate': '$created_at'
                }
              ]
            }, 1000 * 60 * 60 * 24
          ]
        }
      }
    }
  }, {
    '$group': {
      '_id': '$name', 
      'issues': {
        '$sum': 1
      }, 
      'avgAge': {
        '$avg': '$age'
      }, 
      'stdAge': {
        '$stdDevPop': '$age'
      }
    }
  }
];

exports.consolidateIssues = async (dbClient, libName) => {
  const db = process.env.ISSUES_DB;
  const collection = process.env.ISSUES_COLLECTION;

  if(libName) {
    aggregate.unshift({
      '$match': {
        'name': libName
      }
    });
  }

  return await dbClient
    .db(db)
    .collection(collection)
    .aggregate(aggregate)
    .toArray();

  /* await cursor.forEach(lib => {
    console.log(`${lib._id}: ${lib.issues}`);
  }); */
}