FROM node:lts AS build

ENV NODE_ENV build
WORKDIR /app

COPY . /app
RUN npm ci && \
    npm run build
    # npm run docs:generate
RUN chmod +x entrypoint.sh

FROM node:lts-slim

ENV NODE_ENV production

WORKDIR /app
COPY --from=build /app .

EXPOSE 3000

# ENTRYPOINT ["bash", "./entrypoint.sh"]
CMD ["bash", "./entrypoint.sh"]