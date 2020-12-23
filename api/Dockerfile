FROM node:alpine
# FROM node:10-alpine
ENV NODE_ENV=development
ENV PATH=/opt/node_mobules/.bin:$PATH
WORKDIR /opt
COPY package*.json ./
RUN npm install -g npm@7.3.0
# RUN npm install -g node-pre-gyp && npm update node-pre-gyp
RUN npm install && npm cache clean --force 
WORKDIR /opt/app
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]




