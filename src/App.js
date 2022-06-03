import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./app.css"
import Home from "./pages/home/Home";
import {BrowserRouter as Router,
Routes,
Outlet,
Route,
Navigate
} from "react-router-dom"
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";


function App() {

  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
 // const admin=true
 

  const Layout = () => {

    return(

    <> 
    {admin? (
      <>
        <Topbar />
        <div className="container">
            <Sidebar />
            <Outlet />
        </div>
      </>
          ) : (<Navigate to="/login"/>)}

      </>
  )}

  return (
    <Router>
       <Routes>
      <Route path="/login" element={<Login/>}></Route> 
   
      <Route element={<Layout />}>
          <Route exact path="/" element={<Home/>}></Route>  
          <Route path="/users" element={<UserList/>}></Route>
          <Route path="/users/:id" element={<User/>}></Route>
          <Route path="/newUser" element={<NewUser/>}></Route>
          <Route path="/products" element={<ProductList/>}></Route>
          <Route path="/product/:productId" element={<Product/>}></Route>
          <Route path="/newproduct" element={<NewProduct/>}></Route>  
          </Route>
      



          </Routes>
        
        
    </Router>
  );
}

export default App;
