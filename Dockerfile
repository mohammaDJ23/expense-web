FROM node:24-alpine AS node-patched

ENV COREPACK_INTEGRITY_KEYS=0
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

RUN apk update && \
    apk upgrade --available && \
    addgroup -g 1001 -S nodejs && \
    adduser -S expense-web -u 1001 -G nodejs && \
    mkdir -p /usr/src/app && \
    chown -R expense-web:nodejs /usr/src/app

FROM node-patched AS base

ARG VITE_API_URL

ENV VITE_API_URL=${VITE_API_URL}

RUN corepack enable && \
    corepack prepare pnpm@10.29.2 --activate

WORKDIR /usr/src/app

COPY --chown=expense-web:nodejs package.json ./
COPY --chown=expense-web:nodejs pnpm-lock.yaml ./
COPY --chown=expense-web:nodejs pnpm-workspace.yaml ./
COPY --chown=expense-web:nodejs .npmrc ./

FROM base AS installed-packages

RUN pnpm install \
    --ignore-scripts \
    --frozen-lockfile

FROM installed-packages AS development

ENV NODE_ENV=development

COPY --chown=expense-web:nodejs . .

USER expense-web

EXPOSE 9595

CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "9595"]

FROM installed-packages AS build

ENV NODE_ENV=production
ENV npm_config_ignore_scripts=true

COPY --chown=expense-web:nodejs . .

RUN pnpm run build && \
    CI=true pnpm prune --production && \
    rm -rf src

FROM nginx:1.27-alpine AS production

RUN apk update && apk upgrade --available && \
    rm -rf /var/cache/apk/*

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
