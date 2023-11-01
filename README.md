# Ticketing App

Production-grade sell and buy ticketing app built with microservices. Work in progress...

### Stack

- Overview: Nodejs, Typescript, Express, Nextjs, Reactjs, MongoDB, Docker, Kubernetes, Google Cloud
- Unit tests: jest, supertest
- Code sharing between services: npm module
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
  - Features: Signup, signin, signout, current-user
  - Storage: MongoDB
  - Auth strategy: web token using jsonwebtoken
  - Password hashing: randomBytes, scrypt
- Client:
  - Nextjs, React, Server-side rendering
- Common:
  - npm module shared between services
- Ticket
  - Features: Create ticket, list tickets, ticket detail, edit ticket, delete ticket
  - Storage: MongoDB
- Order
- Expiration
- Event bus

### Build a kubernetes environment on the cloud

### Build auth service with minimum packages

### Testing
