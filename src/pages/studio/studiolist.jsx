import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import pixarImage from '../../assets/pixar.jpg';
import styles from "./studiolist.module.css";
const clx = classNames.bind(styles);

const StudioList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [studios, setStudios] = useState([]);

    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/studio");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setStudios(data);
            } catch (error) {
                console.error("Error fetching studios:", error);
            }
        };

        fetchStudios();
    }, []);

    const handleSearchChange = (event) => {
       setSearchQuery(event.target.value.toLowerCase());
    };

    const filteredStudios = studios.filter((studio) =>
      studio.STU_Name.toLowerCase().includes(searchQuery) 
    );

    const handleRowClick = (studioId) => {
        navigate(`/studio/${studioId}`);
    };

    return (
        <div className={clx("wrap")}>
            <div className={clx("search-wrap")}>
                <input
                    type="text"
                    className={clx("search-bar")}
                    placeholder="Search for a studio..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <img
                src= {pixarImage}
                className={clx("studio-image")}
                />
            </div>

            <div className={clx("studio-list")}>
                {filteredStudios.map((studio) => (
                    <div
                        key={studio.STU_ID}
                        className={clx("studio-row")}       
                        onClick={() => handleRowClick(studio.STU_ID)}
                    >
                    {studio.STU_Name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudioList;
