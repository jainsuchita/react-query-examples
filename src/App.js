import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import client from "./react-query-client";

// create a fetcher function to have POST requests
function fetcher(url, body) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function App() {
  // Input box states to add a new record/langauge
  const [language, setLanguage] = useState("");

  // Mutation to add new records
  const mutation = useMutation(
    (body) => {
      return fetcher("http://localhost:3000/api/create-record", body);
    },
    {
      onSuccess(data) {
        client.invalidateQueries("favLangs");
        setLanguage("");
        console.log("requested is completed", data);
      },
      onError(error) {
        console.log("Error with request", { error });
      },
    }
  );

  // Query to get all the fav languages
  const {
    data: favLangs,
    isLoading,
    isError,
  } = useQuery("favLangs", () =>
    fetch("http://localhost:3000/api/get-records").then((t) => t.json())
  );

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return <p>Error returned by server</p>;
  }

  function handleSubmit() {
    mutation.mutate({ records: language });
  }

  // Main Component
  return (
    <div className="App">
      <h2>Favourite Languges</h2>
      {favLangs &&
        favLangs.map((lang, index) => {
          return <li key={`${index}-${lang}`}>{lang}</li>;
        })}

      {/* Input box to add more lang */}
      <input
        type="text"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
