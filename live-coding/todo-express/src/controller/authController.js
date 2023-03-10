function showLoginPage(request, response) {
  response.render("login-page");
}

function login(request, response) {
  if (request.body.username == "Bob" && request.body.password == "123") {

    // Så länge som en session har ett username så är den giltig
    request.session.username = request.body.username;
  }

  response.redirect("/home");
}

function logout(request, response) {
  request.session.username = undefined;

  response.redirect("/login");
}

export default { showLoginPage, login, logout }