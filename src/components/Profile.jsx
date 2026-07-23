import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((state) => state?.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center mt-8">
        Loading profile...
      </div>
    );
  }

  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;
