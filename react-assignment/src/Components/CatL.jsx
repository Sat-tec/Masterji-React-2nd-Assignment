import React, { useRef, useState, useEffect } from "react";
import "./CatList.css";
import OurCard from "./OurCard";
import errorIcon from "../assets/svg/error.svg";

const CatL = () => {
  const [catData, setCatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/cats?page=1&limit=5"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data.data)) {
        const mappedData = data.data.data.map((cat) => ({
          id: cat.id,
          imageUrl: cat.image,
          name: cat.name,
          description: cat.description,
          origin: cat.origin,
          temperament: Array.isArray(cat.temperament)
            ? cat.temperament
            : cat.temperament
            ? cat.temperament.split(", ")
            : [], // Ensure it's an array
          lifeSpan: cat.life_span,
          wikipediaUrl: cat.wikipedia_url,
        }));
        setCatData(mappedData);
      } else {
        throw new Error("Data format is not as expected");
      }
    } catch (error) {
      console.error("Fetch error: ", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (event) => {
    if (scrollContainerRef.current) {
      // Adjust scroll speed and behavior
      const scrollAmount = event.deltaY;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    document.body.style.background = "#bdb6b6d4";
    document.body.style.display = "flex";
    fetchData();
  }, []);

  if (error) {
    return (
      <div className="errorContainer">
        <img src={errorIcon} alt="Data fetching error" className="errorIcon" />
        <p className="errorText">
          Failed to fetch data. Please try again later.
        </p>
        <button className="retryButton" onClick={fetchData}>
          Retry
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="conta">
      
      <a href="https://chaicode.com" target="_blank">
        <img
          src="https://s3-alpha-sig.figma.com/img/6dbf/e4f9/9eddf1549be82b67d870f4041b254cab?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I~hENpWCNY3kb~sXvHQg7uae8G-s~6A9TGLruWNZKOzNvUzveOIGAiFJGEx8Jly2kp1ReBZPy6IZcDu1JYHsrVMvKqaUlUZKlKDp92kjG8BD8Q4nYY9Y9jB6qXSgnP-HHKnn-d8KMx0AtTjTKalRKfcXZL-5b6vfHNpbhP7g-IHOo6tOMm7xxOg5QSfWxhP7QjegE2ROXUso618crIUeaPa5naFHSgRTaa3fGO5VW7x--RvX7EO7guhQa3UrZZcKnQTJnSk4iwUr8YG3nMFBvwu4~dEVjj~hu-e0Kal8oIcbHpIbiXzFHloOyQFn8QVdjx5jgI1T9X9weXWt~csZww__"
          alt="chai-aur-code"
          className="chai"
        />
      </a>

      <div className="main-sec">
        <div className="cat-head">
          <p className="heading">Cats around us</p>
        </div>
        <div
          className="card-conta"
          ref={scrollContainerRef}
          onWheel={handleScroll}
        >
          {catData.map((cat) => (
            <OurCard
              key={cat.id}
              imageUrl={cat.imageUrl}
              name={cat.name}
              description={cat.description}
              origin={cat.origin}
              temperament={cat.temperament}
              lifeSpan={cat.lifeSpan}
              wikipediaUrl={cat.wikipediaUrl}
            />
          ))}
        </div>
      </div>


    </div>
  );
};

export default CatL;