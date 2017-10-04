FROM node:8.6.0
ENV OAI_SPEC_URL="https://raw.githubusercontent.com/sendgrid/sendgrid-oai/master/oai_stoplight.json"

WORKDIR /root

# install Prism
ADD https://raw.githubusercontent.com/stoplightio/prism/master/install.sh install.sh
RUN sh ./install.sh && \
    rm ./install.sh

RUN git clone https://github.com/sendgrid/sendgrid-nodejs.git source && \
    cd source && \
    yarn && \
    ./node_modules/.bin/lerna bootstrap

COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]
