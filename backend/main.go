package main

import (
	"context"
	"log"
	"net"
	"github.com/BettyyN/go-grpc/backend/ping"
	"google.golang.org/grpc"
)

type PingServiceServer struct {
	ping.UnimplementedPingServiceServer
}

func (s PingServiceServer) Ping(ctx context.Context, req *ping.PingRequest) (*ping.PingResponse, error){

	return &ping.PingResponse{
		Message: req.Message,
	},nil

}

func main() {

	lis, err := net.Listen("tcp", ":8089")
	if err != nil {
		log.Fatalf("can not create listner: %s",err)
	}
	serverRegistrar := grpc.NewServer()
	service := &PingServiceServer{}


	ping.RegisterPingServiceServer(serverRegistrar, service)
	err = serverRegistrar.Serve(lis)
	if err != nil{
		log.Fatalf("impossible to serve: %s",err)
	}
}