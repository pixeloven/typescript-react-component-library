FROM nginx:1.15

COPY ./build/index.html /usr/share/nginx/html/index.html
COPY ./build /usr/share/nginx/html/public

