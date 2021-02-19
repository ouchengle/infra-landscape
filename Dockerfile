FROM node:alpine as Builder

LABEL MAINTAINER="TommyLike<tommylikehu@gmail.com>"

RUN mkdir -p /home/infra-landscape
WORKDIR /home/infra-landscape
COPY . /home/infra-landscape
RUN npm install && \
    npm run docs:build

FROM nginx:1.19.2
COPY --from=Builder /home/infra-landscape/dest /usr/share/nginx/html/
COPY ./deploy/default.conf /etc/nginx/conf.d/
RUN chmod -R 755 /usr/share/nginx/html
ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
