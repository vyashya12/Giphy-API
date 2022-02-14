import React, { useState, useEffect } from "react"
import axios from "axios"
import Random from "./Random"

function Giphy() {
  const [giphy, setGiphy] = useState([])
  const [isError, setIsError] = useState(false)
  const [multipleGif, setMultipleGif] = useState(true)
  const [search, setSearch] = useState("")

  let getGiphy = async () => {
    setIsError(false)
    try {
      const result = await axios("http://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "",
          limit: 25,
        },
      })
      setGiphy(result.data.data)
    } catch (e) {
      setIsError(true)
      setTimeout(() => setIsError(false), 4000)
    }
  }

  useEffect(() => {
    getGiphy()
  }, [])
  console.log(giphy)

  let showGiphy = giphy.map((gif) => {
    return (
      <div key={gif.id} className="gif">
        <a href={gif.url} target="_blank" rel="noreferrer">
          <img src={gif.images.fixed_height.url} alt={gif.title} />
        </a>
      </div>
    )
  })

  let error = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismisable fade show"
          roel="alert"
        >
          Unable to get GIFs, please try again later
        </div>
      )
    }
  }

  let onChangeHandler = (e) => {
    setSearch(e.target.value)
  }

  let onSubmitHandler = async (e) => {
    setIsError(false)
    e.preventDefault()
    try {
      const searchResult = await axios("http://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "",
          q: search,
          limit: 25,
        },
      })
      setGiphy(searchResult.data.data)
      e.target.reset()
    } catch (e) {
      setIsError(true)
      setTimeout(() => setIsError(false), 4000)
    }
  }

  return (
    <div>
      <div className="m-2">
        {error()}
        <form
          onSubmit={onSubmitHandler}
          className="d-flex justify-content-center m-2"
        >
          <input
            className="inputBox"
            type="text"
            placeholder="Search GIFs"
            name="search"
            onChange={onChangeHandler}
          />
          <button type="submit" className="btn btn-primary mx-2">
            Lets GO
          </button>
          <button
            onClick={() => {
              setMultipleGif(!multipleGif)
            }}
            className="btn btn-primary"
          >
            Random
          </button>
        </form>
      </div>
      <div className="giphy">
        {multipleGif ? showGiphy : <Random />}
        {/* {showGiphy} */}
      </div>
    </div>
  )
}

export default Giphy
