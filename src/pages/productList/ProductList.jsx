import React from 'react'
import "./productList.css"
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { productsRows } from '../../dummy';
import { Link } from "react-router-dom"
import {fetchProducts,getProducts,fetchFailed} from "../../redux/productRedux"
import { publicRequest, userRequest } from '../../requestMethods'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { deleteProduct } from '../../redux/apiCalls';


const ProductList = () => {
    
    const dispatch = useDispatch()
    const handleDelete = (id) => {
      deleteProduct(id,dispatch)
    
     }
    const productData = useSelector(state=>state.product.products)

    React.useEffect(()=>{
        const productRequest = async() =>{
            dispatch(fetchProducts())
            try{
                const res = await publicRequest.get("products")
                dispatch(getProducts(res.data))
            }catch(e){
                dispatch(fetchFailed())
            }
        }
     productRequest()
    },[])

   

     const columns= [
        { field: '_id', headerName: '_id', width: 270 },
        { field: 'product', headerName: 'Product', width: 290, renderCell:(params)=>{
            return (
                <div className='productListUser'>
                    <img src ={params.row.img} alt="picture" className='productListImg'/>
                    {params.row.title}  
                </div>
            )
        } },
        { field: 'inStock', headerName: 'inStock', width: 190 },
        { field: 'color', headerName: 'Colors',sortable: false,width: 160},
        { field: 'price', headerName: 'price',sortable: false,width: 160},
        { field: 'action', headerName: 'Action',sortable: false,width: 160,renderCell:(params)=>{
      return(
            <>
            
              <Link to={"/product/"+params.row._id}>
              <button className='productListEdit'>Edit</button>
              </Link>
                <DeleteOutline className='productListDelete' onClick={()=>{
                    handleDelete(params.row._id)
                }}/>  

             </>
             
       
      )
  }}
];
 
  return (
    <div className='productList'> 
    <DataGrid
    rows={productData}
    disableSelectionOnClick
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[5]}
    checkboxSelection
    getRowId ={(row) => row._id} 
  />
  </div>
  )
}

export default ProductList