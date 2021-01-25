> To crypt plain password

### Auto generate a hash and salt

```javascript
bcrypt.hash(plainpassword, saltRound, (err, hash) => {
  // store the hash into the db.
});
```

### Compare

```javascript
bcrypt.compare(plainPassword, hash, (err, result) => {
  if (result) {
    // login()
  } else {
    // userMissMatch()
  }
});
```

### serverless function

```javascript
const mongodb = require('mongodb');

exports.handler = async function (event, context) {
  const client = await mongodb.connect(process.env.CONNECTIONSTRING, {
    useUnifiedTopology: true,
  });
  const db = client.db();
  try {
    const dogs = await db.collection('pets').find({ species: 'dog' }).toArray();
    client.close();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dogs),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: 'Please try again later.',
    };
  }
};
```
