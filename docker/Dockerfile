ARG NODEJS_VERSION=20
ARG BUILD_ENV=prod

# pnpm
FROM node:${NODEJS_VERSION}-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# Install only production dependencies
FROM base AS prod

COPY . /nodejs-effect-starter/

WORKDIR /nodejs-effect-starter

RUN pnpm i && pnpm build

# The base for mode ENVIRONMENT=dev, install dev tools
FROM prod as dev
RUN apt update \
  && apt install -y \
  lsof \
  telnet \
  tmux \
  vim \
  && rm -rf /var/lib/apt/lists/*

# Run stage
FROM ${BUILD_ENV}

WORKDIR /nodejs-effect-starter
ENTRYPOINT ["node", "/nodejs-effect-starter/dist/main.js"]