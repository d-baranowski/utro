ARG APP_NAME

FROM golang:1.22.5-alpine AS builder
ARG APP_NAME
COPY . /build
WORKDIR /build
RUN go build -o ./dist/app/${APP_NAME} ./app/${APP_NAME}/cmd/main.go

FROM alpine:3.20.1
RUN apk add --no-cache tzdata
ARG APP_NAME
ENV APP_NAME=${APP_NAME}
COPY --from=builder /build/dist/app/${APP_NAME} /app/${APP_NAME}
ENTRYPOINT ["/bin/sh", "-c", "/app/${APP_NAME} \"$@\"", "--"]
