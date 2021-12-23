module.exports = (app, port) => {
  app.listen(port, () => console.log('http://127.0.0.1:' + port));
  if (process.send) {
    process.send('ready');
  }
};
