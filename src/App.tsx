import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border rounded-md p-5 min-w-[400px] aspect-video">
        <Link to="/login">
          <button className="btn-primary">GoTo Login Page</button>
        </Link>
        <Link to="/admindashboard">
          <button className="btn-primary">GoTo Admin Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
