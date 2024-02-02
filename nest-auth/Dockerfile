FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
ADD . /app

# Install all dependencies
RUN yarn install

# run project
CMD [ "yarn", "start:dev" ]
