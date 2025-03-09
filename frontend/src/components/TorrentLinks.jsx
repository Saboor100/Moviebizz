import React, { useEffect, useState } from "react";
import axios from "axios";

const TorrentLinks = () => {
    const [links, setLinks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/get-torrent-links") 
            .then(response => setLinks(response.data))
            .catch(error => console.error("Error fetching links:", error));
    }, []);

    return (
        <div>
            <h2>Public Domain Movie Torrents</h2>
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TorrentLinks;
