exports.getError = (req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found',path:'/views/404.ejs' });
};