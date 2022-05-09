// Prevent the user from going to any page, if he is not logged in.
export default function ({ redirect, $auth }) {
  if (!$auth.loggedIn) {
    redirect("/login");
  }
}
