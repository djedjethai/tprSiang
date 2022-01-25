# tprSiang

# Description
A online portail shop without any interaction with the user but still highly customizable as the admin can CRUD any content of the website.

# Architecture
This application is design to be horizontally scallable with a Nginx reverse-proxy server as entry point, a Single-page-application for the client side rendering and a direct access(from the the proxy server) to the back-end for all admin operations(using EJS template engine). To limit network latency a Redis server is use for caching. The data are stored on a cloud database and the pictures with AWS S3.

# Technologie
The React library, or more precisely Next.js(for SEO purpose) render the application. Nodejs(Express) is use for the server side. An Nginx server as entry point ensure the security of the application and upstream the requests.

# Features
## Caching
> To reduce network latency of the website, Redis is used for caching.

## Testing
> In order to insure quality of the services, to simplify the debugging process, to allow for (maybe) futur code refactoring and design improvements, each server’s route is tested using Jest-supertest and mongodb-memory-server’s library.   

## Logging
> To gain insight into how the application is working and performing, some key processes are logged as well as some errors (using winston’s library). 

## Decoupled, Transcient and Flexible
> To keep the server scalable and portable, all resources are independant and stored on the cloud. To keep the pictures upload process as efficient as possible, the pictures are not going throught the server but are directly uploaded to AWS cloud provider. 

## Docker, Dockers-compose(Swarm for production)
> Docker-compose create a development environment independant from the host operating system, so ease the transfert to production. In this case, as the website is small and the transition from Docker-compose to Swarm is very simple, Swarm will be use for production.

## Continous-Integration
> A CI/CD pipeline will be set-up (using Travis). It will ease the futur updates and deployments of the application.


