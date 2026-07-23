import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age ?? "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkill] = useState(user?.skill || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();

  const validateProfile = () => {
    if (!firstName.trim()) return "First name is required.";
    if (!lastName.trim()) return "Last name is required.";
    if (!age || Number.isNaN(Number(age)) || Number(age) <= 0)
      return "Please enter a valid age.";
    if (!gender.trim()) return "Gender is required.";
    if (!photoUrl.trim()) return "Photo URL is required.";
    if (!about.trim()) return "About is required.";
    if (!skills.trim()) return "Skills are required.";
    return null;
  };

  const saveProfile = async () => {
    setError(null);
    setSuccess(null);

    const validationError = validateProfile();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          age: Number(age),
          gender: gender.trim(),
          photoUrl: photoUrl.trim(),
          about: about.trim(),
          skills: skills.trim(),
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res?.data?.data || res?.data));
      setTimeout(() => {
        setSuccess("Profile updated successfully.");
      }, 2000);
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Error updating profile.",
      );
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div className="flex justify-center items-center gap-10">
      <div className="flex justify-center items-center mt-8">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs mb-3">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs mb-3">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs mb-3">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  className="input input-bordered w-full max-w-xs"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs mb-3">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs mb-3">
                <div className="label">
                  <span className="label-text">Photo URL</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs mb-3">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs mb-3">
                <div className="label">
                  <span className="label-text">Skill</span>
                </div>
                <textarea
                  className="textarea textarea-bordered w-full max-w-xs"
                  placeholder="Enter your Skills"
                  value={skills}
                  onChange={(e) => setSkill(e.target.value)}
                ></textarea>
              </label>
            </div>
            <div className="toast toast-top toast-end">
              {error && (
                <div className="alert alert-error">
                  <p className="text-white">{error}</p>
                </div>
              )}
              {success && (
                <div className="alert alert-success">
                  <p className="text-white">{success}</p>
                </div>
              )}
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={saveProfile}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        user={{ firstName, lastName, age, gender, photoUrl, about, skills }}
      />
    </div>
  );
};

export default EditProfile;
