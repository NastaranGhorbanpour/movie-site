'use client'
import React, { useState } from 'react'
import Link from 'next/link'

export default function Main() {
    const [movie, setMovie] = useState()

    return (
        <>
            <section id='mainSec' className='w-full h-[100vh] *:text-white flex flex-wrap justify-center items-center '>
                <span className=''></span>
                <div className='w-4/5 relative z-20 *:text-white  '>
                    <h1 className='text-6xl'>Welcome.</h1>
                    <h2 className='text-4xl'>Millions of movies, TV shows and people to discover. Explore now</h2>
                    <div className='relative  mt-10'>
                        <input onChange={(e) => setMovie(e.target.value)} className='w-full h-[40px] bg-white text-black p-5 outline-0 rounded-4xl' type="text" placeholder='Search for a movie ...' />
                        <Link href={{pathname : './results' , query : {title : movie}}}>
                            <button className='w-1/8 h-[40px] bg-[#04B8DC] hover:bg-[#19D1B0] duration-300 text-white absolute rounded-4xl right-0 bottom-0'>Search</button>
                        </Link>
                    </div>

                </div>

            </section>
            
        </>
    )
}





