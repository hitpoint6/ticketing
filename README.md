# Ticket Sphere

Production-grade sell and buy ticketing app built with microservices.

### Overview

Nodejs, Typescript, Express, Nextjs, Reactjs, MongoDB, NATS streaming server, Docker, Kubernetes, Google Cloud,

### Stack

- Unit tests:
  - jest: Javascript testing framework
  - supertest: for testing apis
- Common Code shared between services: npm module
- Cluster Management:
  - Dev tool: skaffold
  - Docker and Kubernetes
    - Deployment (Pod)
    - Service (ClusterIP Service, Nodeport Service)
    - Ingress Nginx (Define routing rules inside the cluster)
  - Google Cloud:
    - Service: Kubernetes Engine, Cloud Build, Load Balancer, gcloud cli,

### Services

- Authentication:
  - Features: signup, signin, signout, current-user
  - Storage: MongoDB
  - Auth strategy: browser cookie using jsonwebtoken
  - Password hashing: randomBytes, scrypt
- Client:
  - Nextjs, React, server-side rendering
- Common:
  - npm module shared between services
- Ticket
  - Features: create ticket, list tickets, ticket detail, edit ticket, delete ticket
  - Storage: MongoDB
- Order
- Expiration
  - bull, job processing manager
  - redis,
- Event bus: NATS streaming server
