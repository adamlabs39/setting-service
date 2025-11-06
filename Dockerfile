FROM node:25-alpine3.22

WORKDIR /adameds-setting
COPY package.json .

# Application config
ENV APPLICATION_PORT=8094
ENV APPLICATION_HOST=0.0.0.0

COPY . .
RUN npm install
EXPOSE $APPLICATION_PORT/TCP
CMD ["npm", "run", "start"]
