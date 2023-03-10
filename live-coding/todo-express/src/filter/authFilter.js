function authenticate(request, response, next) {
  if (request.session.username == undefined) {
    response.redirect("/login");
  } else {
    next(); // om session:en har ett användare, gå vidare till sidan
  }
}

export default { authenticate }