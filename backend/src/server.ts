import app from './app';

const PORT = 3000;

app
  .listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
  })
  .on('error', (err) => {
    console.error(err);
  });
