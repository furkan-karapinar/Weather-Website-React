import { use, useEffect, useRef, useState } from 'react'
import './App.css'
import { FaChevronRight } from "react-icons/fa";
import Swal from 'sweetalert2';
import Weather from './components/weather';

function App() {

  const [weatherData, setWeatherData] = useState(false);
  const [searchcity, setSearchCity] = useState("Manisa");
  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}&lang=tr`;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        Swal.fire({
          title: 'Şehir Bulunamadı',
          text: 'Lütfen başka bir şehir girin',
          icon: 'error',
          confirmButtonText: 'Tamam',
        });
        return;
      }
      if (data.cod === "404") {
        Swal.fire({
          title: 'Şehir Bulunamadı',
          text: 'Lütfen başka bir şehir girin',
          icon: 'error',
          confirmButtonText: 'Tamam',
        });
        return;
      }

      setWeatherData({
        humidity: data.main.humidity,
        wind: data.wind.speed,
        temp: Math.floor(data.main.temp),
        city: data.name,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
      });
    }
    catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    search(searchcity);
  }, [searchcity])

  const inputcity = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const city = inputcity.current.value;
    if (city.trim() === "") {
      Swal.fire({
        title: 'Hatalı Giriş',
        text: 'Lütfen bir şehir adı girin',
        icon: 'error',
        confirmButtonText: 'Tamam',
      });
      return;
    }
    if (city.length < 3) {
      Swal.fire({
        title: 'Hatalı Giriş',
        text: 'Lütfen en az 3 karakter girin',
        icon: 'error',
        confirmButtonText: 'Tamam',
      });
      return;
    }
    if (!/^[a-zA-ZğüşöçİĞÜŞÖÇ\s]+$/.test(city)) {
      Swal.fire({
        title: 'Hatalı Giriş',
        text: 'Lütfen sadece harf girin',
        icon: 'error',
        confirmButtonText: 'Tamam',
      });
      return;
    }
    if (city.length > 20) {
      Swal.fire({
        title: 'Hatalı Giriş',
        text: 'Lütfen en fazla 20 karakter girin',
        icon: 'error',
        confirmButtonText: 'Tamam',
      });
      return;
    }
    setSearchCity(city);
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center h-screen'>
        <div className='w-[450px] h-[600px] bg-white rounded-2xl shadow-xl shadow-purple-950 '>
          <div className='w-full flex items-center justify-center mt-4'>
            <div className=' flex justify-center items-center w-[80%] h-[40px] border-purple-600 black border-3 rounded-xl my-4 py-2 px-4'>
              <input className='w-full h-full outline-none' type="text" name="city_name" id="city_name" ref={inputcity} placeholder='Şehir (Örn. Manisa)' />
              <FaChevronRight className='text-xl text-purple-600 cursor-pointer' onClick={handleSearch} />
            </div>
          </div>
          {/* Hava Durumu Bilgisi */}
          {weatherData ? <Weather wdata={weatherData} /> : ``}
        </div>
      </div>
    </>
  )
}

export default App
