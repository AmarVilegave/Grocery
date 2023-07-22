FROM mongo:latest

ARG DATABASE_URI

ENV DATABASE_URI=${DATABASE_URI}

COPY admins.json /admins.json
COPY categories.json /categories.json
COPY orders.json /orders.json
COPY products.json /products.json
COPY users.json /users.json

EXPOSE 27017

CMD mongoimport --uri ${DATABASE_URI} --collection admins --jsonArray --type json --file admins.json && \
     mongoimport --uri ${DATABASE_URI} --collection categories --jsonArray --type json --file categories.json && \
     mongoimport --uri ${DATABASE_URI} --collection orders --jsonArray --type json --file orders.json && \
     mongoimport --uri ${DATABASE_URI} --collection products --jsonArray --type json --file products.json && \
     mongoimport --uri ${DATABASE_URI} --collection users --jsonArray --type json --file users.json 
