import UserProfile from "../components/UserProfile";
import Navigation from "../components/Navigation";
import Navbar from "../components/Header";

export default function Homepage() {
  return (
    <div className="homepage">
      <Navbar />
      <UserProfile />
      <Navigation />
    </div>
  );
}
