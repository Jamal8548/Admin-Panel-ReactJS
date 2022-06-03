import "./widgetLg.css"
import React from 'react'
import moment from 'moment'
import { userRequest } from '../../requestMethods'
import {format} from "timeago.js"

const WidgetLg = () => {


    const [orders,setOrders]= React.useState([])

        React.useEffect(()=>{
            const getOrders = async()=>{
                try{
                const res = await userRequest.get("orders")
                setOrders(res.data)
                console.log(orders)
                }catch(e){
                    console.log(e)
                }
            }
            getOrders()
        },[])

    const Button = ({type})=>{
        return <button className={"widgetLgButton "+type}>{type}</button>
    }

  return (
      
    <div className='widgetLg'>
        <div style={{marginBottom:"15px"}}>
       <span className="widgetLgTitle">Latest Transactions</span>
       </div>
     
       <ul className="widgetLgList">
           <li className="widgetLgListItem">
           <span style={{ fontWeight:"900"}} className="widgetCustomer">Customer ID</span>
           <div className=" widgetOthers">
               <span  style={{flex:"1", fontWeight:"900"}}>Date</span>
               <span  style={{flex:"1" , fontWeight:"900"}}>Amount</span>
               <span  style={{flex:"1" , fontWeight:"900"}}>Status</span>
           </div>
           
           </li>
       </ul>
        {orders.map((d)=>(

            <ul className="widgetLgList">
                    <li className="widgetLgListItem">
                    <span className="widgetCustomer">
                       
                        <span className="widgetLgName"> {d.userId}</span>
                    </span>
                    <div className=" widgetOthers">
                        <span style={{flex:"1", fontWeight:"300"}}>{format(d.createdAt)}</span>
                        <span style={{flex:"1",fontWeight:"300"}}>{d.amount}</span>
                        <span style={{flex:"1"}}><Button type={d.status}/></span>
                    </div>
                    
                    </li>
                </ul>
        ))}
    </div>
 
  )
}

export default WidgetLg



























// import "./widgetLg.css"

// const WidgetLg = () => {

//   return (
//     <div className='widgetLg'>
//        <span className="widgetLgTitle">Latest Transactions</span>
     
//        <ul className="widgetLgList">
//            <li className="widgetLgListItem">
//            <span className="widgetCustomer">Customer</span>
//            <div className=" widgetOthers">
//                <span>Date</span>
//                <span>Amount</span>
//                <span>Status</span>
//            </div>
           
//            </li>
//        </ul>
//        </div>
 
//   )
// }

// export default WidgetLg