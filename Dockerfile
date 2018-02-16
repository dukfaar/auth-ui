FROM node:alpine
ARG AUTH_BACKEND_SERVER
ARG CLIENT_ID
ARG CLIENT_SECRET

ENV AUTH_BACKEND_SERVER=$AUTH_BACKEND_SERVER
ENV CLIENT_ID=$CLIENT_ID
ENV CLIENT_SECRET=$CLIENT_SECRET

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
