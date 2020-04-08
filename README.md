# Image Filtering Microservice

Simple node express service that converts image into black and white and reduces size.

Also runs a clean up service every 5 minutes to remove temporary files.

Can be deployed in AWS elastic beanstalk

End point: `<AWS EB>/filteredimage?image_url={{}}`
