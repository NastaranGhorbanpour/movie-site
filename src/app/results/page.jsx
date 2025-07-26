'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import './../globals.css'
function SearchResult() {
    const [searchs, setSearchs] = useState()
    const searchParams = useSearchParams()
    const movieName = searchParams.get('title')
    const tmdbApiKey = process.env.NEXT_PUBLIC_API_KEY_FIRST


    useEffect(() => {
        console.log(movieName);


        const tmdbSerch = async () => {
            try {
                const tmdbRes = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${movieName}`)

                if (!tmdbRes.ok) {
                    throw new Error(`HTTP error! status: ${tmdbRes.status}`);
                }
                const tmdbData = await tmdbRes.json()
                setSearchs(tmdbData.results)
            } catch (error) {
                console.log('Error: ' + error);
            }




        }

        tmdbSerch()
    }, [])




    return (
        <section className='p-15 *:bg-white'>
            {searchs && searchs.map((val) => {
                return (
                    <Link href={{ pathname: '/movie', query: { title: val.Title, id: val.id } }}>
                    <div key={val.id} className=' rounded-sm shadow-xl  flex mb-5 border-1 border-[#eeeded]'>
                        
                            <div className='w-[15%] '>
                                <img className='w-full h-full object-cover rounded-sm' src={`https://image.tmdb.org/t/p/original${val.poster_path}`} alt="" />
                            </div>
                            <div className='w-[85%] p-10 '>
                                <h2 className='font-[semi-bold] text-[25px] cursor-pointer mt-3'>{val.title}</h2>

                                <h4 className='font-[reqular] text-[22px] text-[#999999] '>{val.release_date}</h4>
                                <p className='font-[reqular] text-[22px] text-[#999999] mt-5'>{val.overview}</p>
                            </div>
                        
                    </div>
                    </Link>
                )
            })}
        </section>
    )
}

export default function Results() {
    return (
        <Suspense>
            <SearchResult />
        </Suspense>
    )
}
