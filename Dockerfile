FROM node:22.16.0

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

CMD ["npm", "start"]