FROM crystallang/crystal:1.9-alpine AS backend
WORKDIR /app
COPY . ./
RUN shards install
# RUN make CRFLAGS="--release --static --threads=4"
RUN make CRFLAGS="--static --threads=4"

FROM oven/bun AS frontend
RUN apt --quiet update && apt --quiet install make
WORKDIR /app
COPY . ./
RUN bun install
RUN make assets

FROM alpine
RUN mkdir -p /app/tmp/sessions # TODO: save sessions in database
WORKDIR /app
COPY config config/
COPY db db/
COPY entrypoint.sh LICENSE LICENSE-FR ./
COPY --from=backend /app/bin bin/
COPY --from=frontend /app/public public/
EXPOSE 8000
ENTRYPOINT /app/entrypoint.sh
