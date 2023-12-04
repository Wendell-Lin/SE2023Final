# Stage 1: Building the app
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the app using a lightweight server like 'serve'
FROM node:lts-alpine as serve-stage
WORKDIR /app
COPY --from=build-stage /app/build ./build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]
