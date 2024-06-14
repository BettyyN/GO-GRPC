package main

import (
	"context"
	"log"
	"net"
	"testing"

	"github.com/stretchr/testify/assert"
	"google.golang.org/grpc"
	"github.com/BettyyN/go-grpc/backend/ping" // Adjust the import path as needed
)

const (
	testPort = ":8088" // Use a different port number here
)

// mockPingServiceServer implements the PingServiceServer interface
type mockPingServiceServer struct {
	ping.UnimplementedPingServiceServer // Embedding UnimplementedPingServiceServer
}

func (m *mockPingServiceServer) Ping(ctx context.Context, req *ping.PingRequest) (*ping.PingResponse, error) {
	return &ping.PingResponse{
		Message: req.Message,
	}, nil
}

func TestPingService(t *testing.T) {
	// Start the gRPC server in a separate goroutine
	go startGRPCServer(t, &mockPingServiceServer{})

	// Create a gRPC client connection
	conn, err := grpc.Dial("localhost"+testPort, grpc.WithInsecure())
	if err != nil {
		t.Fatalf("Failed to dial server: %v", err)
	}
	defer conn.Close()

	client := ping.NewPingServiceClient(conn)

	// Test Ping method
	response, err := client.Ping(context.Background(), &ping.PingRequest{Message: "Hello"})
	assert.NoError(t, err)
	assert.Equal(t, "Hello", response.GetMessage())
}

// startGRPCServer starts the gRPC server with the provided PingServiceServer implementation
func startGRPCServer(t *testing.T, server ping.PingServiceServer) {
	lis, err := net.Listen("tcp", testPort)
	if err != nil {
		t.Fatalf("Failed to create listener: %v", err)
	}
	grpcServer := grpc.NewServer()
	ping.RegisterPingServiceServer(grpcServer, server)
	go func() {
		if err := grpcServer.Serve(lis); err != nil {
			log.Fatalf("Failed to serve: %v", err)
		}
	}()
}
