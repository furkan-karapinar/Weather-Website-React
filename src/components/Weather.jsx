import React from 'react'
import cloud from '../assets/cloudy.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'
import sun from '../assets/sun.png'
import rain from '../assets/rain.png'
import snowy from '../assets/snowy.png'
import fog from '../assets/fog.png'
import storm from '../assets/storm.png'

const Weather = (wdata) => {
    const data = wdata.wdata;

    const allIcons = {
        "01d": sun,
        "01n": sun,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": cloud,
        "04n": cloud,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "11d": storm,
        "11n": storm,
        "13d": snowy,
        "13n": snowy,
        "50d": fog,
        "50n": fog,
      }

    const icon = allIcons[data.icon] || sun;
        return (
        <div className='flex flex-col items-center justify-center  h-[450px] gap-2 mt-4'>

            <img src={icon} alt="cloud" className='w-[150px] h-[150px] mb-4' />
            <h1 className=' text-6xl font-semibold'>{data.temp}°C</h1>
            <h2 className=' text-3xl font-bold'>{data.city}</h2>
            <h3 className=' text-xl font-semibold capitalize'>{data.description}</h3>

            <div className='flex items-center justify-center gap-10 mt-6'>
                <div className='flex items-center justify-center gap-2 mt-4'>
                    <img src={humidity} alt="sun" className='w-[35px] h-[35px]' />
                    <p className=' text-lg font-semibold'>Nem: %{data.humidity}</p>
                </div>
                <div className='flex items-center justify-center gap-2 mt-4'>
                    <img src={wind} alt="sun" className='w-[35px] h-[35px]' />
                    <p className=' text-lg font-semibold'>Rüzgar: {data.wind} km/s</p>
                </div>
            </div>

        </div>
    )
}

export default Weather