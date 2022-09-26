import { getSession } from 'next-auth/react';
import User from '../../../../models/User';
import database from '../../../../config/database';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(401).send('admin signin required');
  }
  await database.connect();
  const users = await User.find({});
  await database.disconnect();
  res.send(users);
};

export default handler;