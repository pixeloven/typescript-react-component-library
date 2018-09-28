FROM node:8.12

WORKDIR /usr/src/app

EXPOSE 8000

CMD ["yarn", "start-ssr"]
