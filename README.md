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

https://youtu.be/1MTyCvS05V4?list=PLhkjWwqxiVng-RZwn4435K8WhJIy5kLez&t=13678

Error aparce en 3:04:07
