import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear } from "date-fns";
import classNames from "classnames/bind";
import styles from "./studio.module.css";
import naruto from "../../assets/naruto.jpg";
const clx = classNames.bind(styles);

const Studio = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const idx = pathname.split('/')[2];

    const navigate = useNavigate();

    const [studioInfo, setStudioInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [budget, setBudget] = useState(0);
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const selectedYear = getYear(selectedDate);

    useEffect(() => {
        const fetchStudio = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/studio/` + idx);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setStudioInfo(data);
            } catch (error) {
                console.error("Error fetching studio details:", error);
                setError("An error occurred while fetching studio details.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudio();
    }, [idx]);

    useEffect(() => {
        const fetchBudget = async () => {
            if (!studioInfo || !studioInfo.STU_Name) return;
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/studio/budget/${studioInfo.STU_Name}/${selectedYear}/`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBudget(data);
            } catch (error) {
                console.error("Error fetching studio details:", error);
                setError("An error occurred while fetching studio details.");
            }
        };
        fetchBudget();
    }, [selectedYear]);



    if (loading) {
        return (
            <div className={clx("spinner-container")}>Loading...</div>
        );
    }

    if (error) {
        return (
            <div className={clx("error-container")}>{error}</div>
        );
    }

    return (
        <div className={clx("container")}>
            <div className={clx("studio-header")}>
                {/* <img 
                    src={studioInfo.STUDIO_Image || "default_image_url.jpg"} 
                    alt={studioInfo.STU_Name} 
                    className={clx("studio-image")} 
                /> */}
                <div className={clx("studio-name-location")}>
                    <h1 className={clx("studio-name")}>
                        {studioInfo.STU_Name}
                    </h1>
                </div>
            </div>
            <div className={clx("row")}>
                <div className={clx("studio-details")}>
                    <h3>About the Studio</h3>
                    <p>
                        {/* {studioInfo.STUDIO_Description} */}
                        Pixar Animation Studios, known simply as Pixar,
                        is an American animation studio based in Emeryville,
                        California, known for its critically and commercially successful
                        computer-animated feature films. Pixar is a subsidiary of Walt Disney Studios,
                        a division of Disney Entertainment, a segment of The Walt Disney Company.
                    </p>

                    <h3>Movies Produced</h3>
                    <div className={clx("movie-list")}>
                        {studioInfo.produces && studioInfo.produces.length > 0 ? (
                            studioInfo.produces.map((produce) => (
                                <div key={produce.film.FILM_ID} className={clx("movie-item")} onClick={() => { navigate(`/info/${produce.FILM_ID}`) }}>
                                    <img
                                        src={naruto}
                                        className={clx("movie-image")}
                                    />

                                    <div>
                                        <div>{produce.film.FILM_Title}</div>
                                        <p>Start Day: {produce.Start_day}</p>
                                        <p>End Day: {produce.End_day}</p>
                                        <p>Budget: {produce.Budget}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No movies found for this studio.</p>
                        )}
                    </div>
                </div>

                <div className={clx("budget")}>
                    <h3>Budget in year</h3>

                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        showYearPicker
                        dateFormat="yyyy"
                        className={clx("year-picker")}
                    />
                    <h3 className={clx("budget-dollar")}
                    >{budget ? `${budget}$` : 'No budget data for the selected year'}</h3>
                </div>
            </div>
        </div>
    );
};

export default Studio;
