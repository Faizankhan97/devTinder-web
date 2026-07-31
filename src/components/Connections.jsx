import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((state) => state?.connection);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log(response?.data?.data, "connections");
      dispatch(addConnection(response?.data?.data));
    } catch (error) {
      console.log(error, "error in fetching connections");
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="text-center text-5xl font-semibold mt-8">
        No Connections Found
      </h1>
    );

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mt-8">Connections</h1>
      <div className="flex justify-center items-center mt-8 gap-7">
        {connections?.map((connection) => (
          <div
            key={connection.id}
            className="border rounded-lg p-4 flex bg-base-300 gap-6"
          >
            <img
              src={connection.photoUrl}
              alt="photo"
              className="w-20 h-20 mx-auto mb-4"
            />
            <div className="text-left">
              <h4>
                {connection?.firstName} {connection?.lastName}
              </h4>
              <p>{connection.about}</p>
              <p>
                {connection.age} {connection.gender}
              </p>
              <ul>
                {connection?.skills?.map((skill, index) => (
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

export default Connections;
