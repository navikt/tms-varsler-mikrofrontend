FROM node:20-alpine as build
ENV NODE_ENV production

WORKDIR usr/src/app
COPY server server/
COPY dist dist/

WORKDIR server
RUN npm install

FROM gcr.io/distroless/nodejs20-debian12
WORKDIR usr/src/app
COPY --from=build  usr/src/app/server server/
COPY --from=build  usr/src/app/dist dist/

WORKDIR server
CMD ["./server.js"]

USER nonroot
ENV PORT=7600
EXPOSE $PORT
