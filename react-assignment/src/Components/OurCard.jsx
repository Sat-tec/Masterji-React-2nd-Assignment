import React from "react";
import "./CatList.css";

const OurCard = ({
  imageUrl,
  name,
  description,
  origin,
  temperament,
  lifeSpan,
  wikipediaUrl,
}) => {
  // Ensure temperament is an array
  const temperamentArray = Array.isArray(temperament) ? temperament : [temperament];

  const MAX_DESCRIPTION_LENGTH = 248; // Adjust this value based on your requirement
  const truncatedDescription = description.length > MAX_DESCRIPTION_LENGTH
    ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}.`
    : description;
  
  return (
    <div className="card">
      <div className="img">
        <img src={imageUrl} alt={`${name} Image`} className="cat-img" />
      </div>
      <div className="cat-details">
        <div className="sec1">
          <p className="cat-name">{name}</p>
          <p className="cat-des">{truncatedDescription}</p>
        </div>
        <div className="sec2">
          <div className="origin">
            <p className="ori">Origin</p>
            <p className="this-ori">{origin}</p>
          </div>
          <div className="tempera">
            <p className="temp">Temperament</p>
            <div className="sec">
              {temperamentArray.slice(0, 3).map((temp, index) => (
                <div key={index} className={`temp-${index}`}>
                  {temp}
                </div>
              ))}
            </div>
          </div>
          <div className="lifesp">
            <p className="lifes">Life Span</p>
            <p className="this-lif">{lifeSpan}</p>
          </div>
          <div className="learn">
            <a
              className="this-lear"
              href={wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCard;
