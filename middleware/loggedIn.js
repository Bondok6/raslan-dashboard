// Prevent the user from returning to the login page, if he is already logged in.
export default function ({ redirect, $auth }) {
  if ($auth.loggedIn) {
    redirect("/");
  }
}
