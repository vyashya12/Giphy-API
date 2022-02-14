import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "axios";

function Random() {
    const [gif, setGif] = useState()
    const [isError, setIsError] = useState(false)

    let randomGif = async (e) => {
        try{
            let random = await axios("http://api.giphy.com/v1/gifs/random", {
                params: {
                    api_key: "F43ElpiPLlM8hG007HgmF5VrL8338Y5s"
                }
            })
            setGif(random.data.data)
        } catch(e) {
            setIsError(true)
            setTimeout( () => setIsError(false), 4000)
        }
    }

    useEffect(() => {
        randomGif()
    }, [])

    let error = () => {
        if(isError) {
            return(
                <div className="alert alert-danger alert-dismisable fade show" roel="alert">
                    Unable to get GIFs, please try again later
                </div>
            )
        }
    }

    return(
        <div>
            {
                gif ?
                <>
                                <div>
                                    {error()}
                                        <div key={gif.id} className="gif">
                                            <a href={gif.url} target="_blank" rel="noreferrer">
                                                <img src={gif.images.fixed_height.url} alt={gif.title} />
                                            </a>
                                        </div>
                                </div>
                            )
                </>
                :
                <>
                </>
            }
        </div>
    )
}

export default Random