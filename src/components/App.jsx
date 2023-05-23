import "./App.css";
import React, { useEffect, useState } from "react";
import { fetchData } from "./firebase";
import { Grid, TextField, Button } from "@mui/material";
import { updateDoc, doc, addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const [data, setData] = useState([]);
  const [voteText, setVoteText] = useState("");

  useEffect(() => {
    const fetchDataAndLog = async () => {
      const responseData = await fetchData();
      setData(responseData);
    };

    fetchDataAndLog();
  }, []);

  const handleInputChange = (event) => {
    setVoteText(event.target.value);
  };

  const handleVoteSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "responses-collection"), {
        responseText: voteText,
        upvotes: 1,
      });
      console.log("Vote added with ID: ", docRef.id);
      setVoteText("");
      window.location.reload();
    } catch (error) {
      console.error("Error adding vote:", error);
    }
  };
  const handleUpvote = async (item) => {
    try {
      const docRef = doc(db, "responses-collection", item.responseId);
      await updateDoc(docRef, {
        upvotes: item.upvotes + 1,
      });
      console.log("Vote updated for ID: ", item.responseId);
      window.location.reload();
    } catch (error) {
      console.error("Error updating vote:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>What's your favorite food?</h1>
        {data.map((item) => (
          <div key={item.responseId}>
            <Grid container spacing={3}>
              <Grid item xs={6} md={10}>
                {item.responseText} - {item.upvotes}{" "}
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleUpvote(item)}
                >
                  Upvote
                </Button>
              </Grid>
            </Grid>
          </div>
        ))}
        <br></br>

        <TextField
          id="vote-input"
          label="Your vote"
          variant="filled"
          value={voteText}
          onChange={handleInputChange}
        />
        <br></br>

        <Button variant="contained" color="primary" onClick={handleVoteSubmit}>
          Submit
        </Button>
      </header>
    </div>
  );
}

export default App;
