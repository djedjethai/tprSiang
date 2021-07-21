# tprSiang

# Description
A online portail shop without any interaction with the user but still highly customizable as the admin can add, update, delete any content of the website. This website is about selling cars so each product(car) is link to one or more pictures.

# Architecture
This application is design to be horizontally scallable with a Nginx reverse-proxy server as entry point, a Single-page-application for the client side rendering and a direct access(from the the proxy server) to the back-end for all admin operations(using a template engine). To limit network latency a Redis server is use for caching. The data are stored on a cloud database and the pictures are also stored on the cloud in a bucket.

# Technologie
The library React, or more precisely Next.js(for SEO purpose) is use for the SPA. Nodejs(Express) is use for the server side. Nodejs is a good choice as the server do not process any datas but simply Input and Output them. The Nginx server filter the entries and upstream the requests, by this way other services may be add easily in the futur.

# Features
## Caching
> Mainly the latency of any website(web-application) is due to the network, caching is often an efficient solution. Here all representations are cached into a Redis data-structure-server, and refreshed at any update time.

## Testing
> In order to insure quality of the services, to simplify the debugging process, to allow for (maybe) futur code refactoring and design improvements, each server’s route is tested using Jest-supertest and mongodb-memory-server’s library.   

## Logging
> To gain insight into how the application is working and performing, some key processes are logged as well as all the Catched error (using winston’s library). 

## Decoupled, Transcient and Flexible
> To keep the server scalable and portable, all resources are independant and stored on the cloud. To keep the pictures upload process as efficient as possible, the pictures are not going throught the server but are directly uploaded to a cloud provider using presigned-url and Ajax-request. 

## Docker, Dockers-compose(Swarm for production)
> Docker-compose is ideal to create a development environment, and ease the transfert to production. In this case, as the website is small and the transition from Docker-compose to Swarm is very simple, Swarm will be use for production. 

## Continous-Integration
> A Continous integration pipeline will be set-up, using Travis. It will ease all futur updates and deployments of the application. 


![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The stormtroopocat")
