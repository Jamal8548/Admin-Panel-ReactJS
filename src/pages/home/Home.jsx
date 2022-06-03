import React from 'react'
import Chart from '../../components/chart/Chart'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import "./home.css"
import { userData } from '../../dummy'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import { userRequest } from '../../requestMethods'
const Home = () => {
  const [ userStats , setUserStats ] = React.useState([])

  const MONTHS = React.useMemo(
    ()=>[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    []
  )

  React.useEffect(()=>{
    const getStats = async() =>{
      try{
        const res = await userRequest.get("/users/stats")
        res.data.map(item=>
          setUserStats(prev=>[
            ...prev,
            {name:MONTHS[item._id-1],"Active User":item.total},
           
          ])
        )

      }catch(e){
        console.log(e)
      }
    }
    getStats()
   
  },[MONTHS])



  return (
    <div className='home'>
        <FeaturedInfo/>
        <Chart data={userStats} title="User Analytics" dataKey="Active User" grid/>
        <div className='homeWidgets'>
          <WidgetSm/>
          <WidgetLg/>

        </div>

    </div>
  )
}

export default Home