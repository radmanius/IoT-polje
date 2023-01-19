FROM node:18-buster
WORKDIR /react
COPY . .
RUN npm i

WORKDIR /react/react-typescript
EXPOSE 8001

CMD ["npm", "start"]


#docker build -t proba1 .
#docker run -it proba123 /bin/bash
#docker run -d proba123 /bin/bash