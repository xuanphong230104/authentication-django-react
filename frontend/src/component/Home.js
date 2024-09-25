import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const [message, setMessage] = useState("");
  const accessToken = localStorage.getItem("access_token");
  console.log('accessToken>>', accessToken)
  
  const fetchData = async () => {
    try {
        const header = `Authorization: Bearer ${accessToken}`;
      const { data } = await axios.get("http://localhost:8000/home", { headers: {"Authorization" : `Bearer ${accessToken}`} });
      console.log('data', data)
      if (data && data.message) {
        setMessage(data.message);
      } else {
        console.error("API response does not contain a message property");
        // Handle the error case, e.g., display an error message or redirect to an error page
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle general errors, e.g., network issues or server errors
    }
  };

  useEffect(() => {
      fetchData();
    }, []);
    
    if (!accessToken) {
      return <Navigate to="/login" />;
    }
  return (
    <div className="form-signin mt-5 text-center">
      <h3>Hi {message}</h3>
    </div>
  );
};