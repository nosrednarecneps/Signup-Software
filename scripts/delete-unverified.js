const { MongoClient } = require('mongodb');
require('dotenv').config();
const cron = require('node-cron');

const url = process.env.DATABASE_URL;

async function deleteUnverifiedUsers() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Accessed database');
    const db = client.db('wingmail');
    const collection = db.collection('subscribers');
    const unverifiedUsers = await collection.deleteMany({ verified: false });
    console.log(`Deleted ${unverifiedUsers.deletedCount} unverified users.`);
  } finally {
    await client.close();
  }
}

cron.schedule('0 0 * * *', async () => {
    console.log('Running user cleanup job...');
    try {
        await deleteUnverifiedUsers();
    } catch (err) {
        console.error('Error in the user cleanup job');
    }
});
