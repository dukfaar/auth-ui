FROM node:alpine

ENV PORT 3000

EXPOSE 3000

COPY package*.json ./
RUN npm install --production

COPY tsconfig.json ./
COPY src ./src 
RUN npm run tsc

COPY webpack.config.js ./
COPY .babelrc ./
COPY static ./static
RUN npm run webpack

CMD ["node", "dist/"]
