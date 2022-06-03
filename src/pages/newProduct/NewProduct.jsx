import React from 'react'
import "./newProduct.css"
import { addProduct } from '../../redux/apiCalls'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase"
import { useDispatch } from 'react-redux';

const NewProduct = () => {

const dispatch = useDispatch()
const [newProduct , setNewProduct] = React.useState({})
const [file , setFile] = React.useState(null)
const [cat , setCat] = React.useState([])

const handleChange = (e) =>{
  setNewProduct((prev)=>{
    return {...prev, [e.target.name]:e.target.value}
  })
}
 
const handleCat = (e) =>{
  setCat(
    [e.target.name]= e.target.value.split(",")
  )
}


const handleClick = (e)=>{
e.preventDefault()
const fileName = new Date().getTime() + file.name
const storage = getStorage(app)
const storageRef = ref(storage,fileName)
const uploadTask = uploadBytesResumable(storageRef, file);

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
    const product = {...newProduct, img:downloadURL, categories:cat}
    addProduct(product,dispatch)
    });
  }
);
}

  return (
    <div className="newProduct">
    <h1 className="addProductTitle">New Product</h1>
    <form className="addProductForm">
      <div className="addProductItem">
        <label>Image</label>
        <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}  />
      </div>
      <div className="addProductItem">
        <label>Title</label>
        <input type="text" placeholder="Apple Airpods" name="title" onChange={(e)=>handleChange(e)} />
      </div>
      <div className="addProductItem">
        <label>Price</label>
        <input type="number" placeholder="100" name="price" onChange={(e)=>handleChange(e)} />
      </div>
      <div className="addProductItem">
        <label>Desccription</label>
        <input type="text" placeholder="description..." name="desc" onChange={(e)=>handleChange(e)} />
      </div>
      <div className="addProductItem">
        <label>Categories</label>
        <input type="text" placeholder="Jeans skirts" name="categories" onChange={(e)=>handleCat(e)}/>
      </div>
      <div className="addProductItem">
        <label>inStock</label>
      <select name="inStock" onChange={(e)=>handleChange(e)} >
      <option>---</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      </div>
      <button onClick={handleClick}className="addProductButton">Create</button>
    </form>
  </div>
  )
}

export default NewProduct
