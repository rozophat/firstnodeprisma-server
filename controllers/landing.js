exports.get_landing = function(req, res, next) {
  res.render('landing', { title: 'Landing Page' });
}

exports.submit_lead = function(req, res, next) {
  console.log("Lead email: ", req.body.lead_email);
  res.redirect('/landing');
} 