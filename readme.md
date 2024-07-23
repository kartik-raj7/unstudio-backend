## Getting Started

First Install the necessary packages using command 

```bash 
npm install
```


then run the development server using

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Configuration
Environment Variables:

Create a .env file in the root directory of the project and add the following environment variables:

makefile

```bash
DATABASE_URL=your-database-url
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
JWT_SECRET=your-jwt-secret
```
Replace your-database-url, your-cloudinary-cloud-name, your-cloudinary-api-key, your-cloudinary-api-secret, and your-jwt-secret with your actual credentials.

Prisma Setup:

Initialize Prisma and migrate the database:

```bash
npx prisma init
npx prisma migrate dev --name init
```

Usage
Start the server:

```bash
npm start
```

The server will be running on http://localhost:3001.
