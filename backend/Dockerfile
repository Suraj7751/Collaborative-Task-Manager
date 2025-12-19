FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --include=dev

COPY . .

RUN chmod +x node_modules/.bin/tsc
RUN npm run build

EXPOSE 4000

CMD ["node", "dist/server.js"]
