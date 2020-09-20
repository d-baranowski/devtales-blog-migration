FROM node:lts-alpine3.9

RUN apk add bash jq python3 --no-cache --update
RUN pip3 install awscli && pip3 install boto3==1.9.89

WORKDIR /code
COPY ./ /code

RUN chmod +x ./recreate-table.sh
RUN chmod +x ./load-data.sh

RUN aws configure set region eu-west-1
RUN npm install --prefix ./unmarshal-cli
RUN cd ./unmarshal-cli && npm install -g
