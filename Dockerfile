FROM node
ADD . /src
RUN cd /src && npm install
WORKDIR /src