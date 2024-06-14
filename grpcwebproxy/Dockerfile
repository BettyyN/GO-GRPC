FROM golang:1.22.4


WORKDIR /go/src/github.com/improbable-eng/grpc-web


RUN git clone https://github.com/improbable-eng/grpc-web.git .


RUN go mod tidy

RUN go install ./go/grpcwebproxy

RUN cp $GOPATH/bin/grpcwebproxy /usr/local/bin/

EXPOSE 8081

CMD ["grpcwebproxy", "--backend_addr=backend:8089", "--backend_tls_noverify", "--run_tls_server=false", "--allow_all_origins"]
