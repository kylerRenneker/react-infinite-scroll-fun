import React, { useState, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'

function App() {
  const [hasMore, setHasMore] = useState(true)
  const [jokes, setJokes] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(null)

  const getJokes = () => {
    fetch(`https://icanhazdadjoke.com/search?page=${pageNumber}`, {
      headers: {
        accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTotalPages(data.total_pages)
        let jokeState = jokes;
        data.results.map((joke) => {
          jokeState.push(joke)
        })
        setJokes(jokeState)
      })
      .then(res => {
        if (pageNumber === totalPages) {
          setHasMore(false)

        } else {
          setPageNumber(pageNumber + 1);
        }
      })
  }

  const renderJokes = () => {
    let items = []

    jokes.map((joke, i) => items.push(<h1 key={i}>{joke.joke}</h1>))

    return items;
  }

  return (
    <div className="App" >
      <InfiniteScroll
        pageStart={0}
        loadMore={getJokes}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        {renderJokes()}
        {pageNumber === totalPages ? <h1>Sorry, no more jokes...</h1> : null}
      </InfiniteScroll>
    </div>
  )
}


export default App
