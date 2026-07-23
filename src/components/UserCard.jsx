const UserCard = ({ user }) => {
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
          <button className="btn btn-secondary">Ignore</button>
          <button className="btn btn-primary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
