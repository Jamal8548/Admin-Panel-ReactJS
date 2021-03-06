import React,{useState} from 'react'
import {Link, useLocation} from "react-router-dom"
import Chart from '../../components/chart/Chart'
import "./product.css"
import { productData } from '../../dummy'
import { Publish } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import { updateProduct } from '../../redux/apiCalls';



const Product = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const productId = location.pathname.split("/")[2]
    const product = useSelector(state=>state.product.products.find(product => product._id===productId))
    console.log(product)

    const [productUpdate, setProductUpdate] = useState({})
    const [fileImage,setFileImage] = useState()

    const handleChange = (e) => {
        setProductUpdate((prev)=>{
            return {...prev, [e.target.name]:e.target.value}
        })
    }
    const handleFile = (e) =>{
        setFileImage(e.target.files[0])
    }
    
    const handleClick = (e)=>{
        e.preventDefault()
        const fileName = new Date().getTime() + fileImage.name
        const storage = getStorage(app)
        const storageRef = ref(storage,fileName)
        const uploadTask = uploadBytesResumable(storageRef, fileImage);
        
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', 
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
            }
          }, 
          (error) => {
            // Handle unsuccessful uploads
          }, 
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const product = { _id: productId, ...productUpdate, img:downloadURL}
            updateProduct(productId, product, dispatch)
            });
          }
        );
        }

  return (
    <div className='product'>
       <div className="productTitleContainer">
           <h1 className="productTitle">Product</h1>
           <Link to={"/newproduct"}>
           <button className='productAddButton'>Create</button>
           </Link> 
       </div>

       <div className="productTop">

        <div className='productTopLeft'>
            <Chart data={productData} dataKey="Sales" title="Sales Performance"/>
        </div>
        <div className='productTopRight'>
            <div className="productInfoTop">
                <img src={product.img} alt="" className='productInfoImg'/>
                <span className='productName'>{product.title}</span>
            </div>
            <div className="productInfoBottom">
                <div className="productInfoItem">
                    <span className='productInfoKey'>id:</span>
                    <span className='productInfoValue'>{product._id}</span>
                </div>

                <div className="productInfoItem">
                    <span className='productInfoKey'>Sales</span>
                    <span className='productInfoValue'>4123</span>
                </div>
                <div className="productInfoItem">
                    <span className='productInfoKey'>in Stock:</span>
                    <span className='productInfoValue'>{product.inStock}</span>
                </div>
            </div>
        </div>

       </div>




       <div className="productBottom">
           <form className="productForm">
               <div className="productFormLeft">
                <label>Product Name</label>
                <input type="text" name="title" placeholder={product.title} onChange={(e)=>handleChange(e)}/>
                <label>Product Description</label>
                <input type="text" name="desc" placeholder={product.desc}   onChange={(e)=>handleChange(e)}/>
                <label>Price</label>
                <input type="text" name="price" placeholder={product.price} onChange={(e)=>handleChange(e)}/>

                <label>In Stock:</label>
                <select name="inStock" id="idStock" onChange={(e)=>handleChange(e)}>
                    <option>---</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

               </div>
               <div className="productFormRight">
                   <div className="productUpload">
                       <img src={product.img}alt="" className="productUploadImg" />
                       <label for="file">
                           <Publish/>
                       </label>
                       <input type="file" id="file" name="img" style={{display:"none"}} onChange={(e)=>handleFile(e)}/>
                   </div>
                   <button onClick={handleClick} className="productButton">Update</button>
               </div>
           </form>
       </div>
    </div>
  )
}

export default Product