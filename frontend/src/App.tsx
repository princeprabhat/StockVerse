import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { io } from "socket.io-client";
type SData = {
  price: number;
  name: string;
};
const App = () => {
  const [data, setData] = useState<SData[]>([]);

  const socket = io("http://localhost:3002");

  useEffect(() => {
    const fetchData = async () => {
      const data: { data: SData[] } = await axios.get(
        "http://localhost:3002/api"
      );
      console.log("data", data);
      setData(data.data);
    };
    fetchData();

    socket.on("hello", (msg) => {
      setData(msg);
    });
  }, []);

  return (
    <div className="card-container">
      {data.map((el, idx) => {
        return (
          <div key={idx} className="card-1">
            <p>Stock name is: {el.name}</p>
            <p>Stock price is: {el.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
