ARG version=lts
FROM node:$version

ENV NODE_TLS_REJECT_UNAUTHORIZED 0

WORKDIR /app
COPY . .

RUN make install
