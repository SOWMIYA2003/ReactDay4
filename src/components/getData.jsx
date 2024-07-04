import React, { useState, useEffect } from "react";
import PrintData from "./printData";
import axios from 'axios';
import './getData.css';

const GetData = () => {
    const [rickData, setRickData] = useState([]);
    const [page, setPage] = useState(1); // Track the current page
    const [info, setInfo] = useState({}); // Track pagination info

    useEffect(() => {
        getDataHandler(page);
    }, [page]);

    const getDataHandler = async (page) => {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`);
        setRickData(response.data.results);
        setInfo(response.data.info);
    };

    const handleNext = () => {
        if (info.next) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        if (info.prev) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <React.Fragment>
            <h1 className="title">Rick and Morty</h1>
            <div className='character'>
                {rickData && rickData.map((iterator, index) => (
                    <PrintData charData={iterator} key={index} />
                ))}
            </div>
            <div className="buttons">
                <button className="previous" onClick={handlePrevious} disabled={!info.prev}>Previous</button>
                <button className="next" onClick={handleNext} disabled={!info.next}>Next</button>
            </div>
        </React.Fragment>
    );
};

export default GetData;