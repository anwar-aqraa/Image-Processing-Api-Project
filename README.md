Image Processing API
Overview

## Project Overview

This project is a simple **Image Processing API** built with **TypeScript** and **Express**.
It allows users to resize images by providing a filename, width, and height through an API endpoint.
The API processes images using the **Sharp** library and returns the resized image.

Images are processed using the library and cached for faster future access.

Images are stored on disk in assets/full and resized images are cached in assets/thumb.

## Technologies Used

- Node.js
- Express
- TypeScript
- Sharp (image processing)
- Jasmine (unit testing)
- SuperTest (API testing)
- ESLint & Prettier

## Project Structure

- **assets/**
  - `full/` → original images  
  - `thumb/` → resized images (cached)

- **src/**
  - **routes/api/**
    - `images.ts` → API endpoint
  - **utilities/**
    - `resizeImage.ts` → image processing function
  - **tests/**
    - **api/**
      - `imagesSpec.ts`
    - **utilities/**
      - `resizeSpec.ts`
    - **helpers/**
      - `reporter.ts`
  - `index.ts` → Express server

- **spec/support/**
  - `jasmine.json`

- `build/`
- `package.json`
- `tsconfig.json`
- `README.md`

## Installation

Install dependencies

npm install

## Running the Server

Start the server using:

npm start

- Starts development server with nodemon

The server will run at:

http://localhost:3000

## API Endpoint

Resize an image using the following endpoint:

http://localhost:3000/api/images

### Query Parameters

| Parameter | Description                                                     |
| --------- | --------------------------------------------------------------- |
| filename  | name of the image in the assets/full folder (without extension) |
| width     | desired image width (number > 0)                                |
| height    | desired image height (number > 0)                               |

### Example Request

http://localhost:3000/api/images?filename=fjord&width=400&height=400

The API will return the resized image.

## Image Caching

When an image is requested for the first time:

The API resizes the image.

The resized image is saved in:

assets/thumb

If the same image with the same dimensions is requested again, the cached image is returned instead of resizing it again.

## Testing

Testing is done using **Jasmine** and **SuperTest**.

Tests are written using:

Run tests with:

npm test

- Runs Jasmine tests using compiled JS

Expected output:

9 specs, 0 failures

Tests include:

- API endpoint tests
- Success scenarios
- Error scenarios
- Image processing utility tests

## Build the Project

npm run build

- Compiles TypeScript to JavaScript

Dev watch

npm run dev

- Watches TypeScript changes and rebuilds

Linting
Check code style with ESLint:

npm run lint
-Runs ESLint on src/\*_/_.ts

Formatting
Format the code with Prettier:

npm run format

- Runs Prettier to check/format code

## Image Processing Utility

Image resizing is implemented using the **Sharp** library.

The `resizeImage` utility function:

- takes an input image
- resizes it to the specified width and height
- saves the result in the `assets/thumb` folder

## Error Handling

The API handles multiple error scenarios including:

- Missing filename
- Missing width or height
- Invalid width or height
- Non-existent image file

Each case returns an appropriate HTTP status code.

## Author

Image Processing API Project
Built using TypeScript and Express.
