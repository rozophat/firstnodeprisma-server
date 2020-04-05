exports.get_landing = function(req, res, next) {
  res.render('landing', { title: 'Landing Page' });
}