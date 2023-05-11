FROM node:19-slim

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci

COPY tsconfig.json config.ts ./
COPY ./src ./src
RUN npm run build
RUN rm -rf src
RUN npm prune --production

CMD ["node", "./dist/src/index.js"]

