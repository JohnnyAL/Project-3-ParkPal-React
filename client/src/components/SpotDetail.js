import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SpotDetail = props => {
  const spotId = props.match.params.spotId;
  const [spot, setSpot] = useState(null);
  const [showEdit, setEdit] = useState(false);
  const [showDelete, setDelete] = useState(false);

  useEffect(() => {
    axios.get(`/parking-spots/detail/${spotId}`).then(response => {
      setSpot(response.data.spot);
      setEdit(response.data.showEdit);
      setDelete(response.data.showDelete);
    });
  }, []);

  const deletePost = () => {
    axios.delete(`/parking-spots/delete/${spotId}`).then(response => {
      props.history.push("/listings");
    });
  };

  return (
    <div>
      {spot ? (
        <>
          <h1>{spot.name}</h1>
          <p>Price: ${spot.price}/hour</p>
          <p>
            <img height="300px" src={spot.image} alt="image not available" />
          </p>
          <p>{spot.description}</p>
          <h4>Address</h4>
          <p>
            {spot.address.street_address}
            <br />
            {spot.address.city}, {spot.address.state} {spot.address.zip_code}
          </p>
          <p>Type: {spot.type}</p>
          <p>Size: {spot.size}</p>
          <h4>Availability</h4>
          <p>
            From: {new Date(spot.start_date).toDateString()} @{" "}
            {new Date(spot.start_time).toTimeString().slice(0, 5)}
          </p>
          <p>
            To: {new Date(spot.end_date).toDateString()} @{" "}
            {new Date(spot.end_time).toTimeString().slice(0, 5)}
          </p>
          <p>Posted by: {spot.owner.username}</p>
        </>
      ) : null}

      {showEdit ? (
        <Link to={`/edit/${spot._id}`}>Edit your listing</Link>
      ) : null}

      <br />

      {showDelete ? (
        <button onClick={deletePost}>Delete your listing</button>
      ) : null}
    </div>
  );
};

export default SpotDetail;
