const dotenv = require('dotenv');
dotenv.config();
const { v4: uuid } = require('uuid');
const mongodb = require('mongodb');
// fd729826-cbdb-4cf0-a241-4d9d61aa1fcf
let aMovie = {
  _id: uuid(),
  title: 'Diary of a Wimpy Kid',
  year: 2010,
  rated: 'PG',
  runtime: 94,
  countries: ['USA'],
  genres: ['Comedy', 'Family'],
  director: 'Thor Freudenthal',
  writers: [
    'Jackie Filgo',
    'Jeff Filgo',
    'Gabe Sachs',
    'Jeff Judah',
    'Jeff Kinney',
  ],
  actors: ['Zachary Gordon', 'Robert Capron', 'Rachael Harris', 'Steve Zahn'],
  plot:
    'The adventures of a teenager who is fresh out and in Middle School, where he has to learn the consequences and responsibility to survive the year.',
  poster:
    'http://ia.media-imdb.com/images/M/MV5BMTg3NzQ2NDgyNF5BMl5BanBnXkFtZTcwMDc1NzIyMw@@._V1_SX300.jpg',
  imdb: { id: 'tt1196141', rating: 6.2, votes: 30079 },
  tomato: {
    meter: 53,
    image: 'rotten',
    rating: 5.5,
    reviews: 105,
    fresh: 56,
    consensus:
      'Unlike its bestselling source material, Diary of a Wimpy Kid fails to place a likable protagonist at the center of its middle-school humor -- and its underlying message is drowned out as a result.',
    userMeter: 49,
    userRating: 3.2,
    userReviews: 102770,
  },
  metacritic: 56,
  awards: { wins: 5, nominations: 8, text: '5 wins & 8 nominations.' },
  type: 'movie',
};

mongodb.connect(
  process.env.CONNECTIONSTRING,
  { useUnifiedTopology: true },
  async (err, client) => {
    let db = client.db();
    // retrieve all the documents.
    let results = await db.collection('movieDetails').find().toArray();

    // insert
    let videos = db.collection('movieDetails');
    await videos.insertOne(aMovie);
    console.log('A new movie added.');

    // update
    let videos = db.collection('movieDetails');
    try {
      await videos.updateOne(
        { _id: 'fd729826-cbdb-4cf0-a241-4d9d61aa1fcf' },
        { $set: { title: 'Added via node' } },
      );
      console.log('Updated a movie title');
    } catch (e) {
      console.log(e);
    }

    // delete a movie
    let videos = db.collection('movieDetails');
    try {
      await videos.deleteOne({ _id: 'fd729826-cbdb-4cf0-a241-4d9d61aa1fcf' });
      console.log('A movie deleted');
    } catch (e) {
      console.log(e);
    }

    client.close();
  },
);
