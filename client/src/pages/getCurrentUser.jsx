import { auth } from "../firebase";

const getCurrentUser = () => {
  // Get the current user from Firebase authentication
  const user = auth.currentUser;

  if (user) {
    // If a user is logged in, return their display name
    return user.displayName;
  } else {
    // If no user is logged in, return null or handle accordingly
    return null;
  }
};

export default getCurrentUser;
