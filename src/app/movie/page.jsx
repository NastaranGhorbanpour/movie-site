'use client'
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import '@/../public/assets/fonts/css/fontello.css'
import UserScore from "../components/scoreCircle";


function MovieInfo() {
  const searchParams = useSearchParams()
  const movieName = searchParams.get('title')
  const movieID = searchParams.get('id')
  const tmdbApiKey = process.env.NEXT_PUBLIC_API_KEY_FIRST


  const [movieInfo, setMovieInfo] = useState()
  const [director, setDirector] = useState()
  const [genres, setGenres] = useState()

  useEffect(() => {

    const tmdbData = async () => {
      try {
        const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${tmdbApiKey}`)

        if (!tmdbRes.ok) {
          throw new Error(`HTTP error! status: ${tmdbRes.status}`)
        }
        const tmdbData = await tmdbRes.json()
        setMovieInfo(tmdbData)
        const genre = tmdbData.genres.map((val) => val.name).join(', ')
        setGenres(genre)

      } catch (error) {
        console.log('Error: ' + error);
      }



    }

    const director = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${tmdbApiKey}`)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setDirector(data.crew.find(person => person.job === 'Director').name)

      } catch (error) {
        console.log('Error: ' + error);
      }

    }
    tmdbData()
    director()

  }, [])
  function handleClick(e) {
    if (e.currentTarget.dataset.click === 'false') {
      e.currentTarget.classList.replace('text-white', 'text-red-500')
      e.currentTarget.dataset.click = 'true'
    } else {
      e.currentTarget.classList.replace('text-red-500', 'text-white')
      e.currentTarget.dataset.click = 'false'
    }

  }

  return (
    <section className='movies' style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieInfo && movieInfo.backdrop_path})` }}>
      <div>
        <div id="poster-div">
          <img src={`https://image.tmdb.org/t/p/original${movieInfo && movieInfo.poster_path}`} alt="" />
        </div>


        <div id="info-div">

          <div>
            <h1 className="font-[sans-bold] text-[45px] font-bold mr-2">{movieInfo && movieInfo.title}</h1>
          </div>

          <div>
            <h3 className="border-1 rounded-sm flex justify-center px-1">{movieInfo && movieInfo.origin_country[0]} ,  {movieInfo && movieInfo.origin_country[1]} </h3>
            <h3>{movieInfo && movieInfo.release_date} . </h3>
            <h3>{genres} . </h3>
            <h3>{movieInfo && movieInfo.runtime} min . </h3>
          </div>

          <div className="my-5">
            <UserScore value={movieInfo && Math.round(movieInfo.vote_average * 10)} />
          </div>

          <div className="">
            <i className=" icon-list-bullet"></i>
            <i data-click='false' className="icon-heart mx-5 text-white" onClick={handleClick}></i>
            <i data-click='false' className="icon-bookmark text-white" onClick={handleClick}></i>
          </div>

          <div>
            <p className="font-[sans-bold] text-[16px] text-[#C5CBCF] font-normal">{movieInfo && movieInfo.tagline}</p>
            <h2 className="font-[semi-bold] text-[21px] font-bold mt-2">Overview</h2>
            <p className="font-[regular] text-[18px] font-normal">{movieInfo && movieInfo.overview}</p>
            <h2 className="font-[sans-bold] text-[16px] font-bold mt-3">{director}</h2>
            <p className="font-[regular] text-[14px] font-normal leading-5">Director</p>
          </div>

        </div>
      </div>
    </section>
  )



}

export default function Results() {
    return (
        <Suspense>
            <MovieInfo />
        </Suspense>
    )
}






