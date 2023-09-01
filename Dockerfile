
FROM node:18-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node apps/backend/package*.json ./apps/backend/
COPY --chown=node:node apps/frontend/package*.json ./apps/frontend/

RUN npm install

COPY --chown=node:node . .

RUN npm run build

RUN npm cache clean --force

USER node

FROM node:18-alpine As production

ENV ENV=production

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/apps/backend/node_modules ./apps/backend/node_modules
COPY --chown=node:node --from=build /usr/src/app/apps/frontend/node_modules ./apps/frontend/node_modules

COPY --chown=node:node --from=build /usr/src/app/apps/backend/dist ./apps/backend/dist
COPY --chown=node:node --from=build /usr/src/app/apps/frontend/dist ./apps/frontend/dist

# Start the server using the production build
CMD [ "node", "apps/backend/dist/main.js" ]