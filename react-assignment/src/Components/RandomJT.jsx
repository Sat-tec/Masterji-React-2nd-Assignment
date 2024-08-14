import React, { useEffect, useState } from "react";
import styles from "./RandomJT.module.css";
import dots from "../assets/svg/menu.svg";
import line from "../assets/svg/line.svg";
import comma from "../assets/svg/comment.svg";
import share from "../assets/svg/share.svg";
import heart from "../assets/svg/heart.svg";
import bookm from "../assets/svg/bookmar.svg";
import down from "../assets/svg/downl.svg";
import back from "../assets/svg/back-w.svg";
import errorIcon from "../assets/svg/error.svg";

const RandomJT = () => {
  const [postData, setPostData] = useState({});
  const [jokes, setjokes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJokes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes/joke/random"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setjokes(data.data);
    } catch (error) {
      setError(error);
      console.error("Error fetching jokes:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateRandomDate = () => {
    const year = getRandomNumber(2020, 2024);
    const month = getRandomNumber(1, 12);
    const day = getRandomNumber(1, 28); // To avoid invalid dates
    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const generateRandomTime = () => {
    const hours = getRandomNumber(0, 23);
    const minutes = getRandomNumber(0, 59);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${hours < 12 ? "AM" : "PM"}`;
  };

  const generateRandomPostData = () => {
    const viewCount = getRandomNumber(100, 2000000);
    let views;

    if (viewCount >= 1000000) {
      views = `${(viewCount / 1000000).toFixed(1)}M`;
    } else if (viewCount >= 1000) {
      views = `${(viewCount / 1000).toFixed(1)}K`;
    } else {
      views = viewCount.toString();
    }

    // console.log(`Generated view count: ${viewCount}, formatted views: ${views}`);

    return {
      time: generateRandomTime(),
      date: generateRandomDate(),
      views: views,
      comments: `${getRandomNumber(1, 10)}K`,
      shares: `${getRandomNumber(1, 10)}K`,
      likes: `${getRandomNumber(10, 100)}K`,
      bookmarks: `${getRandomNumber(1, 5)}K`,
    };
  };

  useEffect(() => {
    document.body.style.height = "832px";
    document.body.style.background = "#FFFFFF";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    fetchJokes();
    setPostData(generateRandomPostData());
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <img
          src={errorIcon}
          alt="Data fetching error"
          className={styles.errorIcon}
        />
        <p className={styles.errorText}>
          Failed to fetch data. Please try again later.
        </p>
        <button className={styles.retryButton} onClick={fetchJokes}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.backIcon}>
            <img src={back} alt="back" />
          </div>

          <div className={styles.text}>
            <p className={styles.heading}>Post</p>
          </div>
        </div>

        <div className={styles.profile}>
          <div className={styles.left}>
            <img
              className={styles.profImg}
              src="https://s3-alpha-sig.figma.com/img/8f9a/a88a/f84c0b0523188e60955912d822eb8566?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TflSxcOuYvBBhd7DP5-EEvfmStahk1UXCrBXsBa2yreh5N31fFUYFU6mfPu4dW9SRJ8dQbWTekDymGUruTPembAFDp2sQB0MODjP3Ow26cCMcKrMSE1kv8JTJ56ARUW338d5b3LglPHXxa9t8Sj4GDSFcuh4q0~lQE94yPtD3~e7OlcDaKQ9DJnh7jiF5~hKbpY57zhMZjBevAKNKA7D8ndmCbgdirYz~HdH3lPCY6o0yCGCJqgD5OperbezopeI5TawIP1jgAYQ0Rc0bachZslA1cbjAfHFKpc1f0cuHBWKbjNpYdi6i1cRhX2UchW9eK00JtPMV-e79nc3-hSKGA__"
              alt="Elon Image"
            />

            <div className={styles.text}>
              <p className={styles.name}>Elon Musk</p>
              <p className={styles.username}>@elonmusk</p>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.option}>
              <img src={dots} alt="dots" />
            </div>
          </div>
        </div>

        <div className={styles.tweet}>
          <p className={styles.twee}>{jokes.content}</p>
        </div>

        <div className={styles.details}>
          <p className={styles.det}>
            {postData.time} . {postData.date} .{" "}
            <span className={styles.views}>{postData.views}</span> Views
          </p>
        </div>

        <img className={styles.line} src={line} alt="line" />

        <div className={styles.opti}>
          <div className={styles.comm}>
            <img src={comma} alt="comment" />
            <p className={styles.comment}>{postData.comments}</p>
          </div>
          <div className={styles.sha}>
            <img src={share} alt="share" />
            <p className={styles.share}>{postData.shares}</p>
          </div>
          <div className={styles.hea}>
            <img src={heart} alt="heart" />
            <p className={styles.like}>{postData.likes}</p>
          </div>
          <div className={styles.book}>
            <img src={bookm} alt="bookmark" />
            <p className={styles.bookmark}>{postData.bookmarks}</p>
          </div>
          <div className={styles.down}>
            <img src={down} alt="down" />
          </div>
        </div>

        <img className={styles.line} src={line} alt="line" />

        <div className={styles.foot}>
          <p className={styles.copy}>© chai aur code</p>
        </div>
      </div>

      <a href="https://chaicode.com" target="_blank">
        <img
          src="https://s3-alpha-sig.figma.com/img/6dbf/e4f9/9eddf1549be82b67d870f4041b254cab?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I~hENpWCNY3kb~sXvHQg7uae8G-s~6A9TGLruWNZKOzNvUzveOIGAiFJGEx8Jly2kp1ReBZPy6IZcDu1JYHsrVMvKqaUlUZKlKDp92kjG8BD8Q4nYY9Y9jB6qXSgnP-HHKnn-d8KMx0AtTjTKalRKfcXZL-5b6vfHNpbhP7g-IHOo6tOMm7xxOg5QSfWxhP7QjegE2ROXUso618crIUeaPa5naFHSgRTaa3fGO5VW7x--RvX7EO7guhQa3UrZZcKnQTJnSk4iwUr8YG3nMFBvwu4~dEVjj~hu-e0Kal8oIcbHpIbiXzFHloOyQFn8QVdjx5jgI1T9X9weXWt~csZww__"
          alt="chai-aur-code"
          className={styles.chai}
        />
      </a>
    </div>
  );
};

export default RandomJT;
