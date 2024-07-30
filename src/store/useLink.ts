import React, { useEffect } from 'react'
import { useState } from 'react';
import axios,{AxiosError}  from 'axios';

export default function useLink<T>(url:string) {
  const [data,setData] = useState<T | null>(null);
  const [error,setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const fetchData = async() => {
      const options = {
        method: 'GET',
        url: 'https://link-previewer1.p.rapidapi.com/',
        params: {
          q: url,
        },
        headers: {
          'x-rapidapi-key': process.env.LINK_API_KEY,
          'x-rapidapi-host': 'link-previewer1.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setData(response.data)
      } catch (error) {
        console.error(error);
      }
    }

    if(url != ''){
      fetchData();
    }
  },[url])
  
  return {data,error};
}
