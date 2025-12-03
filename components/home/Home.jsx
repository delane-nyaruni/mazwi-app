import React from 'react'
import 
{ BsFillBellFill}
 from 'react-icons/bs'
 import { FaTags, FaWineBottle,  FaRegHospital } from 'react-icons/fa'
 import 
 { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function Home() {

    
  const data = [
    {
      name: 'M',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'T',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'W',
      uv: 2000,
      pv: 4800,
      amt: 2290,
    },
    {
      name: 'T',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'F',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'S',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'S',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
     

  return (
    <main className='main-container'>
    <div className='main-title'>
        <h3 class="text-gray-600">DASHBOARD</h3>
    </div>

    <div className='main-cards'>
        <div className='card btn-effect'>
            <div className='card-inner'>
                <h3>Total Cows</h3>
                <FaTags className='card_icon'/>
            </div>
            <h1>301</h1>
        </div>
        <div className='card'>
            <div className='card-inner'>
                <h3>Milk</h3>
                <FaWineBottle className='card_icon'/>
            </div>
            <h1>121</h1>
        </div>
        <div className='card'>
            <div className='card-inner'>
                <h3>Intensive Care</h3>
                <FaRegHospital className='card_icon'/>
            </div>
            <h1>33</h1>
        </div>
        <div className='card'>
            <div className='card-inner'>
                <h3>Alerts</h3>
                <BsFillBellFill className='card_icon'/>
            </div>
            <h1>42</h1>
        </div>
    </div>

    <div className='charts'>
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>

    </div>
</main>
  )
}

export default Home