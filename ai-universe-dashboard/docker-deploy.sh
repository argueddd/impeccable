#!/bin/bash

# Configuration
IMAGE_NAME="ai-universe-dashboard"
CONTAINER_NAME="ai-universe-dashboard-app"
PORT=${1:-8080} # Default port is 8080 if not provided

echo "======================================"
echo " Building Docker Image: $IMAGE_NAME"
echo "======================================"

# Build the docker image
docker build -t $IMAGE_NAME .

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Check if container with same name already exists and remove it
    if [ $(docker ps -a -q -f name=^/${CONTAINER_NAME}$) ]; then
        echo "Removing existing container..."
        docker rm -f $CONTAINER_NAME
    fi

    echo "======================================"
    echo " Starting Container on Port: $PORT"
    echo "======================================"
    
    # Run the container
    docker run -d \
        --name $CONTAINER_NAME \
        -p $PORT:80 \
        --restart unless-stopped \
        $IMAGE_NAME

    if [ $? -eq 0 ]; then
        echo "✅ Container started successfully!"
        echo "🌐 You can access the dashboard at: http://localhost:$PORT"
        echo "💡 To view logs: docker logs -f $CONTAINER_NAME"
        echo "🛑 To stop: docker stop $CONTAINER_NAME"
    else
        echo "❌ Failed to start container."
    fi
else
    echo "❌ Build failed. Please check the errors above."
fi