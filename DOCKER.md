# Docker Deployment Guide

## Quick Start

### Start the Application
```bash
# Build and start all services
docker-compose up --build

# Run in background (detached mode)
docker-compose up -d --build
```

### Stop the Application
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### View Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f
```

## Individual Service Management

### Backend Only
```bash
# Build and run backend
docker-compose up --build backend

# Shell into backend container
docker-compose exec backend bash

# View backend logs
docker-compose logs -f backend
```

### Frontend Only
```bash
# Build and run frontend (requires backend)
docker-compose up --build frontend

# Shell into frontend container
docker-compose exec frontend sh

# View frontend logs
docker-compose logs -f frontend
```

## Development with Docker

### Hot Reload Development
For development with hot reload, you can mount source code as volumes:

```yaml
# Add to docker-compose.override.yml
version: '3.8'
services:
  backend:
    volumes:
      - ./backend:/app
    command: uvicorn main:app --host 0.0.0.0 --port 8000 --reload
  
  frontend:
    volumes:
      - ./frontend/src:/app/src
    command: npm start
```

### Environment Variables
Create environment-specific files:

```bash
# Development
.env.development

# Production
.env.production

# Testing
.env.test
```

## Troubleshooting

### Port Conflicts
If ports 3000 or 8000 are in use:

```yaml
# Modify docker-compose.yml
services:
  backend:
    ports:
      - "8001:8000"  # Change host port
  frontend:
    ports:
      - "3001:80"    # Change host port
```

### Clean Rebuild
```bash
# Remove all containers and images
docker-compose down --rmi all

# Remove volumes
docker-compose down -v

# Clean rebuild
docker-compose up --build --force-recreate
```

### Database/Volume Issues
```bash
# Reset all volumes
docker-compose down -v
docker volume prune

# Restart fresh
docker-compose up --build
```

## Production Deployment

### Environment Setup
1. Set production environment variables
2. Use production docker-compose file
3. Set up SSL/TLS certificates
4. Configure domain names

### Production docker-compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    restart: always
    environment:
      - ENVIRONMENT=production
    
  frontend:
    build: ./frontend
    restart: always
    ports:
      - "80:80"
      - "443:443"
```

### Health Checks
```bash
# Check backend health
curl http://localhost:8000/health

# Check frontend
curl http://localhost:3000

# Check API
curl http://localhost:8000/api/v1/ml/health
```

## Monitoring and Maintenance

### Container Status
```bash
# View running containers
docker-compose ps

# View resource usage
docker stats

# View container details
docker-compose exec backend ps aux
```

### Backup and Restore
```bash
# Backup volumes
docker run --rm -v ml_data:/data -v $(pwd):/backup ubuntu tar czf /backup/backup.tar.gz /data

# Restore volumes
docker run --rm -v ml_data:/data -v $(pwd):/backup ubuntu tar xzf /backup/backup.tar.gz -C /
```

## Network Configuration

### Custom Networks
```yaml
networks:
  ml-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

### Service Discovery
Services can communicate using service names:
- Backend: `http://backend:8000`
- Frontend: `http://frontend:80`

## Security Considerations

### Production Security
1. Use non-root users in containers
2. Limit container capabilities
3. Use secrets management
4. Enable container scanning
5. Regular security updates

### Network Security
```yaml
services:
  backend:
    networks:
      - internal
  frontend:
    networks:
      - internal
      - external

networks:
  internal:
    internal: true
  external:
```
