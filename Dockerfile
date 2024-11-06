FROM node:19.5.0-alpine

WORKDIR /adameds-setting
COPY package.json .

# Application config
ENV APPLICATION_PORT=8082
ENV APPLICATION_HOST=0.0.0.0

COPY . .
RUN npm install
EXPOSE $APPLICATION_PORT/TCP
CMD ["npm", "run", "start"]
