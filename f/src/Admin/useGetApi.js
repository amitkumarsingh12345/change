import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useGetApi = (url) => {
  
    const [fetched, setFetched] = useState();
    const getHandler = async () => {
        const data = await axios.get(`http://localhost:11000/${url}`);
        console.log(data);
        setFetched(data?.data);
    }
    useEffect(() => {
        getHandler();
    }, []);
    return {fetched};
}
export default useGetApi