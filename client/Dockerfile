FROM node:alpine
ENV NODE_ENV=production
WORKDIR '/app'
COPY package*.json ./
RUN npm install --only=production \
 && npm cache clean --force 
COPY . .
RUN npm run prod:build-server \
	&& npm run prod:build-client
# add --tiny for shuting down
EXPOSE 3000
CMD ["node build/bundle.js"]
 
# FROM nginx
# useless on our cpu, but needed for AWS elasticBeanstalk
# EXPOSE 80
# COPY --from=0 /app/build /usr/share/nginx/html

