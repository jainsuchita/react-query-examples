import React, { useState } from "react";
import { useQuery } from "react-query";
import client from "./react-query-client";

function Post({ id, goBack }) {
  const { data, isLoading } = useQuery(
    ["post", id],
    () =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
        res.json()
      )
    // { staleTime: Infinity }
  );

  function mutateTitle() {
    // change only one post data
    client.setQueryData(["post", id], (oldData) => {
      if (oldData) {
        return {
          ...oldData,
          title: "Mutated title",
        };
      }
    });
  }

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <h2>Post No {id}</h2>
      <h1>Title : {data.title}</h1>
      <button onClick={mutateTitle}>Mutate the Title</button>
      <p>Description: {data.body}</p>
      <a href="#" onClick={goBack}>
        Go Back
      </a>
    </div>
  );
}

function App() {
  const [postId, setPostId] = useState(null);

  const { isLoading, data: posts } = useQuery(
    "posts",
    () =>
      fetch(`https://jsonplaceholder.typicode.com/posts`).then((res) =>
        res.json()
      ),
    {
      cacheTime: 0,
      select: (res) => res.slice(0, 5),
    }
  );

  // Get a single Post
  if (postId !== null) {
    return (
      <Post
        id={postId}
        goBack={() => {
          setPostId(null);
        }}
      />
    );
  }

  // if loading, show loader
  if (isLoading) {
    return <h2>Loading ... </h2>;
  }

  const cachedPost = client.getQueryData(["post", postId]);
  console.log({ cachedPost });

  function mutatePostsTitle(id) {
    // Change all cached posts data
    client.setQueryData("posts", (oldData) => {
      if (oldData.length > 0) {
        return oldData.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              title: "hurrah",
            };
          }
          return post;
        });
      }
    });
  }

  // else show the component
  return (
    <div className="App">
      {posts.map((post) => {
        // get the cached post
        const cachedPost = client.getQueryData(["post", post.id]);
        return (
          <h2 key={post.id}>
            <b>{cachedPost ? "(visited)" : ""} </b>
            {post.id} -{" "}
            <a onClick={() => setPostId(post.id)} href="#">
              {post.title}
            </a>
            {/* mutate the title */}
            <button onClick={() => mutatePostsTitle(post.id)}>
              Mutate the content
            </button>
          </h2>
        );
      })}
    </div>
  );
}

export default App;
