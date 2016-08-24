FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
# copy our files
COPY lib/ /usr/src/app/lib/
# copy expressjs files
COPY app.js /usr/src/app/
# expressjs folders
copy bin/ /usr/src/app/bin/
copy public/ /usr/src/app/public/
copy routes/ /usr/src/app/routes/
copy views/ /usr/src/app/views/
ENV PORT 8081
EXPOSE 8081
CMD ["npm", "start"]
