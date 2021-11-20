function handleError(err, req, res, next) {
  if (err instanceof NotFoundError) {
    res
      .status(404)
      .render('error', {
        message: err instanceof ValidationError ? err.message : `Nie można znaleść elementu o danym ID`,
      });
    return;
  }

  console.error(err);

  res.status(err instanceof ValidationError ? 400 : 500);

  res.render('error', {
    message: err instanceof ValidationError ? err.message : `Przepraszamy spróbuj ponownie za jakiś czas`,
  });
}

class ValidationError extends Error {
}

class NotFoundError extends Error {
}


module.exports = {
  handleError,
  ValidationError,
  NotFoundError,
};