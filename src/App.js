import React, { useState } from "react";
import Users from "./Components/Users/Users";
import User from "./Components/Users/User";

const App = () => {
  const [userId, setUserId] = useState();

  const handleSetId = (id) => {
    console.log({ id });
    setUserId(id);
  };

  return (
    <div className="App">
      <Users setUserId={handleSetId} />
      <User id={userId} />
    </div>
  );
};

export default App;
