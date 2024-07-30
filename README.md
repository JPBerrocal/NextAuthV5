This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

# Quick guide

This a quick reminder of the overall process used to install and configure Auth.js, is not meant to replace the official documentations of Prisma and Auth.js

[Prisma](https://www.prisma.io/docs/getting-started)

[AuhtJS](https://authjs.dev/getting-started/installation?framework=next.js)

## Prisma SetUp

1. Install prisma and prisma client

```
npm i -D prisma
npm i @prisma/client
```

2. Create the file lib/db.ts

3. Set the env variable
   DATABASE_URL=

4. Initialize the prisma client

5. Set the datasurce and generator client inside schema.prisma

```
npx prisma init
```

7. Create schemas inside schema.prisma

```
npx prisma generate
npx prisma db push
```

Prisma commands

npx prisma migrate reset => recrea la base de datos y la limpia
npx prisma studio => abre prisma estudio

## Auth Setup

1. Install

```
npm install next-auth@beta
```

2. Create auth.ts in the project root

3. Set API route,
   app/api/auth/[...nextauth]/route.ts

4. Set env variable:
   #Generado con "openssl rand -base64 33"
   AUTH_SECRET=

5. Test /api/auth/providers

6. Setting Middleware

- In application root create middleware.ts
- The matcher tells next for wich routes the middleware is going to be executed,

Middleware matcher
https://clerk.com/docs/references/nextjs/auth-middleware#usage

## Setting Prisma to work with auth

1. Create the file auth.config.ts and split auth.ts

```
npm i @auth/prisma-adapter
```

2. Create the file routes.ts in the root of the application, we are going to use this file
   to map all the routes in the application that are going to be
   protected and public in the middleware.ts

3. Set the routes in the middleware

## Credentials Provider

1. Set the credentials provider in the auth.config.ts and implement the authorize function

2. Call the signIn and signOut functions in the server actions

3. Call the server actions in the forms

## Define Callbacks

1. In auth.ts define the callbacks that are going to be trigger when and action such as signIn, signOut or redirect is performed:

```javascript
...
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {

  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
...
```

2. We add the user role to the token, because we can access it in the middleware so we can verify if the user is an
   admin in the middleware to protec the route

3. Adding custom types to the session.user and token interfaces, is done in new file called next-auth.d.ts (https://authjs.dev/getting-started/typescript)

## Oauth providers (Google and Github)

1. Import and add the providers in the file auth.config.ts

2. Define the events in auth.ts. Events are asynchronous functions that do not return a response, they are useful
   for audit logs / reporting or handling any other side-effects.
   [AuthJS Events](https://next-auth.js.org/configuration/events)

## Email verification for credential providers

1. Create Verification model inside prisma.schema.

2. Create /data/verification-token.ts

3. Create /lib/tokens.ts

4. Install

```
npm install uuid
npm install -save-dev @types/uuid
```

5. Add the generation and verification tokens in the server actions, login-action and register-action. Additionally, the auth callbacks should be protected against users who have not yet confirmed their email.

6. Set email provider, in this case resend.com. In dev only the email you use to register the resend account will work until you add a domain. So make sure to create the test user using the same email.

7. Install

```
npm install resend
```

8. Create the function to send the email via resend in /lib/email.ts. Call this function in the auth server actions.

9. Create the page and route to redirect the users to confirm their email. In this case /auth/new-verefication.

10. Create the server action to verify the email. actions/emailVerification-action.ts

## Reset Password

1. Create reset form

2. create reset action

3. Create the schema model in schema.prima for the PasswordResetToken

4. Create util functions to retrive reset token in data/reset-tokens.ts

5. generate the reset tokens in lib/tokens.ts

6. Create function to generate the email in lib/email

7. Generate the token and send the email in the reset-action

8. Create Reset Password Form

9. Create reset password server action.

## 2FA

1. Add the field isTwoFactorEnabled and TwoFactorConfirmation to the user prisma schema

2. Create the prisma models for TwoFactorToken and TwoFactorConfirmation entities.

3. Generate the prisma models and update the database

4. Create util functions to retrive 2FA token in data/two-factor-token.ts

5. Create function to retrieve 2FA by user id in data/two-factor-confirmation.ts

6. generate the 2FA tokens in lib/tokens.ts

7. In auth.ts, modify the signIn callback to prevent login for users that required 2FA, this can be verified in the dabatase, the field is isTwoFactorEnabled = true

8. Add the code field to the LoginSchema

https://youtu.be/1MTyCvS05V4?list=PLhkjWwqxiVng-RZwn4435K8WhJIy5kLez&t=19810
