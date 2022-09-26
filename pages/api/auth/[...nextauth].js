import NextAuth from 'next-auth';
import User from '../../../models/User';
import database from '../../../config/database';
import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await database.connect();
        const user = await User.findOne({
          email: credentials.email,
        });        

        await database.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            image: 'picture',
            isAdmin: user.isAdmin,
          };
        }
        throw new Error('Email o contraseña incorrectos');
      },
    }),       
  ],
});
