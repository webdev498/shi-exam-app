FROM cgiengineering/http-server
LABEL version="0.1"

MAINTAINER Michael Filbin <mike@filb.in>
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY . /usr/app
RUN npm install; \
    NODE_ENV=production \
    GOOGLE_CLIENT_ID=584302945146-hf91k8glaa97agv0mbi5d61mm2kglkau.apps.googleusercontent.com \
    FACEBOOK_CLIENT_ID=228791194154793 \
    npm run build:prod

CMD ["http-server", "/usr/app/dist", "-p 8000"]
EXPOSE 8000
