import { useState, useEffect } from "react";

export function getUser(){
    const [userData, setUserData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/users");
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user list:", error);
            }
        };
        fetchData();
    }, []);
    return userData;
}