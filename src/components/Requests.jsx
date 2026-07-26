import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((state) => state.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(response.data?.data));
      console.log("fetched requests:", response?.data);
    } catch (error) {
      console.error("Error Fetching Requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="text-center text-5xl font-semibold mt-8">
        No Requests Found
      </h1>
    );
  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-8">Requests</h1>
      <div className="flex justify-center items-center mt-8">
        {requests?.map((request) => (
          <div
            key={request.id}
            className="border rounded-lg p-4 flex bg-base-300 gap-6"
          >
            <img
              src={request?.fromUserId?.photoUrl}
              alt="photo"
              className="w-20 h-20 mx-auto mb-4"
            />
            <div className="text-left">
              <h4>
                {request?.fromUserId?.firstName} {request?.fromUserId?.lastName}
              </h4>
              <p>{request?.fromUserId?.about}</p>
              <p>
                {request?.fromUserId?.age} {request?.fromUserId?.gender}
              </p>
              <ul>
                {request?.fromUserId?.skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
