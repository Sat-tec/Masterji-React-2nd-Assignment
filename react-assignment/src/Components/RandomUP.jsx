import React, { useState, useEffect } from "react";
import styles from "./RandomUP.module.css"; 
import back from "../assets/svg/back.svg";
import refresh from "../assets/svg/refresh.svg";
import locat from "../assets/svg/locat.svg";
import call from "../assets/svg/call.svg";
import noInternetIcon from "../assets/svg/no-internet.svg";
import errorIcon from "../assets/svg/error.svg";

const RandomUP = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.body.style.height = "832px";
    document.body.style.background = "#00000080"; 
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const online = await checkInternetConnection();
      if (!online) {
        setError("no-internet");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomusers/user/random"
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);
      setUserData(data.data);
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  };

  const checkInternetConnection = async () => {
    try {
      const testUrl =
        "https://api.freeapi.app/api/v1/public/randomusers/user/random";
      const response = await fetch(testUrl, {
        method: "HEAD",
        cache: "no-store",
      });
      return response.ok;
    } catch (e) {
      return false;
    }
  };

  const openMap = () => {
    if (userData && userData.location && userData.location.coordinates) {
      const { latitude, longitude } = userData.location.coordinates;
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      window.open(url, "_blank");
    }
  };

  const makeCall = () => {
    if (userData && userData.phone) {
      const telUrl = `tel:${userData.phone}`;
      window.open(telUrl, "_blank");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error === "no-internet") {
    return (
      <div className={styles.errorContainer}>
        <img src={noInternetIcon} alt="No internet connection" className={styles.errorIcon} />
        <p className={styles.errorText}>No internet connection. Please check your network.</p>
        <button className={styles.retryButton} onClick={fetchData}>Retry</button>
      </div>
    );
  } else if (error === "fetch-error") {
    return (
      <div className={styles.errorContainer}>
        <img src={errorIcon} alt="Data fetching error" className={styles.errorIcon} />
        <p className={styles.errorText}>Failed to fetch data. Please try again later.</p>
        <button className={styles.retryButton} onClick={fetchData}>Retry</button>
      </div>
    );
  } else if (error === "other-error") {
    return (
      <div className={styles.errorContainer}>
        <img src={errorIcon} alt="Error" className={styles.errorIcon} />
        <p className={styles.errorText}>Oops! Something went wrong.</p>
        <button className={styles.retryButton} onClick={fetchData}>Retry</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.cont}>
      <div className={styles.main}>
        <div className={styles.head}>
          <div className={styles.back}>
            <img src={back} alt="back icon" />
          </div>

          <div className={styles.text}>
            <p className={styles.topHeading}>Profile Overview</p>
          </div>

          <div className={styles.refresh} onClick={fetchData}>
            <img src={refresh} alt="refresh icon" />
          </div>
        </div>

        <div className={styles.profile}>
          <div className={styles.img}>
            <img src={userData.picture.large} alt="profilepic" className={styles.profImg} />
          </div>

          <div className={styles.text}>
            <p className={styles.name}>{`${userData.name.first} ${userData.name.last}`}</p>
            <p className={styles.id}>{userData.login.username}</p>
          </div>
        </div>

        <hr className={styles.line} />
        <div className={styles.mid}>
          <div className={styles.locat}>
            <div className={styles.locSvg}>
              <img src={locat} alt="location icon" onClick={openMap} />
            </div>
            <p className={styles.locText}>Location</p>
          </div>
          <div className={styles.call}>
            <div className={styles.calSvg}>
              <img src={call} alt="call icon" onClick={makeCall} />
            </div>
            <p className={styles.calText}>Call me</p>
          </div>
        </div>
        <hr className={styles.line} />

        <div className={styles.moreDetails}>
          <div className={styles.row}>
            <div className={styles.col1}>
              <p className={styles.ci}>City</p>
              <p className={styles.city}>{userData.location.city}</p>
            </div>

            <div className={styles.col2}>
              <p className={styles.naHead}>Nationality</p>
              <p className={styles.nationality}>{userData.nat}</p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col1}>
              <p className={styles.dHead}>Date of birth</p>
              <p className={styles.dob}>{new Date(userData.dob.date).toLocaleDateString()}</p>
            </div>

            <div className={styles.col2}>
              <p className={styles.phoHead}>Phone No.</p>
              <p className={styles.phone}>{userData.phone}</p>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.col1}>
              <p className={styles.tiHead}>Time Zone</p>
              <p className={styles.timeZone}>
                {userData.location.timezone.offset} ({userData.location.timezone.description.split(",")[0]})
              </p>
            </div>

            <div className={styles.col2}>
              <p className={styles.regHead}>Registered Since</p>
              <p className={styles.registSince}>
                {new Date(userData.registered.date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.foot}>
          <p className={styles.copy}>&copy; chai aur code</p>
          <a href="https://chaicode.com" target="_blank">
            <img
              src="https://s3-alpha-sig.figma.com/img/6dbf/e4f9/9eddf1549be82b67d870f4041b254cab?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=I~hENpWCNY3kb~sXvHQg7uae8G-s~6A9TGLruWNZKOzNvUzveOIGAiFJGEx8Jly2kp1ReBZPy6IZcDu1JYHsrVMvKqaUlUZKlKDp92kjG8BD8Q4nYY9Y9jB6qXSgnP-HHKnn-d8KMx0AtTjTKalRKfcXZL-5b6vfHNpbhP7g-IHOo6tOMm7xxOg5QSfWxhP7QjegE2ROXUso618crIUeaPa5naFHSgRTaa3fGO5VW7x--RvX7EO7guhQa3UrZZcKnQTJnSk4iwUr8YG3nMFBvwu4~dEVjj~hu-e0Kal8oIcbHpIbiXzFHloOyQFn8QVdjx5jgI1T9X9weXWt~csZww__"
              alt="chai-aur-code"
              className={styles.chai}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomUP;
