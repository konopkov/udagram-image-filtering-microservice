import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import fs from 'fs';

function runAsyncWrapper (callback: any) {
  return function (req: any, res: any, next: any) {
    callback(req, res, next)
        .catch(next)
  }
}

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // Endpoint to filter an image from a public url
  app.get( "/filteredimage", runAsyncWrapper(async ( req: Request, res: Response ) => {
    const { image_url } = req.query;

    //    1. validate the image_url query
    if ( !image_url ) {
      return res.status(400)
          .send(`image url is required`);
    }

    try {
      //    2. call filterImageFromURL(image_url) to filter the image
      const filteredImagePath: string = await filterImageFromURL(image_url);
      if (filteredImagePath) {

        //    3. send the resulting file in the response
        const filteredImageStream = fs.createReadStream(filteredImagePath);
        filteredImageStream.pipe(res);

        //    4. deletes any files on the server on finish of the response
        filteredImageStream.on('end', () => {
          deleteLocalFiles([filteredImagePath])
        });
      } else {
        res.status(422)
            .send(`Error occurred :(`);
      }
    }
    catch (e) {
      console.log(`Error processing image ${image_url}`);
      res.status(422)
          .send(`Error occurred :(`);
    }
  } ));

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );


  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();
