import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare, hash } from 'bcryptjs';
import { query } from './db';
import { authConfig } from '../../auth.config';
import type { User } from 'next-auth';

import type { NextAuthConfig } from 'next-auth';

export const authOptions: NextAuthConfig = {
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const userResult = await query('SELECT * FROM users WHERE email = $1', [
          credentials.email as string,
        ]);

        let user = userResult.rows[0];

        if (!user) {
          const countResult = await query('SELECT COUNT(*) FROM users');
          const userCount = parseInt(countResult.rows[0].count, 10);

          if (userCount === 0) {
            const hashedPassword = await hash(credentials.password as string, 12);
            const newUser = await query(
              `INSERT INTO users (email, password_hash, role, created_at, updated_at)
               VALUES ($1, $2, 'admin', NOW(), NOW())
               RETURNING id, email, role`,
              [credentials.email, hashedPassword]
            );
            user = newUser.rows[0];
            return {
              id: user.id,
              email: user.email,
              role: 'admin',
            } as User;
          } else {
            return null; // Return null for failed auth
          }
        }

        const isValid = await compare(
          credentials.password as string,
          user.password_hash
        );

        if (!isValid) {
          return null; // Return null for failed auth
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role || 'user',
        } as User;
      },
    }),
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);