# tprSiang

# Description
A online portail shop without any interaction with the user but still highly customizable as the admin can add, update, delete any content of the website. This website is about selling cars so each product(car) is link to one or more pictures.

# Architecture
This application is design to be horizontally scallable with a Nginx reverse-proxy server as entry point, a Single-page-application for the client side rendering and a direct access(from the the proxy server) to the back-end for all admin operations(using a template engine). To limit network latency a Redis server is use for caching. The data are stored on a cloud database and the pictures are also stored on the cloud in a bucket.

# Technologie
The library React, or more precisely Next.js(for SEO purpose) is use for the SPA. Nodejs(Express) is use for the server side. I feel Nodejs is a good choice as the server do not process any datas but simply Input and Output them. The Nginx server filter the entries and upstream the requests, by this way other services can be add and run independently of the already deployed servers.
