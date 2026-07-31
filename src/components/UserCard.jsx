import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error("Error sending interest request:", error);
    }
  };

  return (
    <div className="card bg-black w-96 shadow-xl">
      <figure>
        <img src={user?.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {user?.firstName} {user?.lastName}
        </h2>
        <p>
          {user?.age} {user?.gender}
        </p>
        <p>{user?.about}</p>
        <p>{user?.skill}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("ignore", user?._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", user?._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
