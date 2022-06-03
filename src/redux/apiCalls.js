import {  publicRequest,userRequest } from "../requestMethods"
import { logingStart, loginFailure, loginSuccess } from "./userRedux"
import { deleteProductStart, deleteProductSuccess, deleteProductFailure,updateProductStart,
    updateProductSuccess,updateProductFailure, addProductStart,
    addProductSuccess,addProductFailure  } from "./productRedux"
import {createUserStart,createUserSuccess,createUsersFailed ,deleteUserStart,deleteUserSuccess,deleteUsersFailed,  updateUserStart,updateUserSuccess,updateUsersFailed} from "./userListRedux"
//LOGIN FEATRUE
export const login = async(dispatch,user)=>{
    dispatch(logingStart())
    try{
        const res = await userRequest.post("/auth/login",user)
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}

//DELETE PRODUCT
export const deleteProduct = async(id,dispatch)=>{
    dispatch(deleteProductStart())
    try{
        const res = await userRequest.delete(`products/${id}`)
        dispatch(deleteProductSuccess(id))
    }catch(err){
        dispatch(deleteProductFailure())
    }
}


//UPDATE PRODUCT
export const updateProduct = async(id,product,dispatch)=>{
    dispatch(updateProductStart())
    try{
        const res = await userRequest.put(`products/${id}`, product)
        dispatch(updateProductSuccess({id:id, product:product}))
    }catch(err){
        dispatch(updateProductFailure())
    }
}


//ADD PRODUCT
export const addProduct = async(product,dispatch)=>{
    dispatch(addProductStart())
    try{
        const res = await userRequest.post(`/products`, product)
        dispatch(addProductSuccess(res.data))
    }catch(err){
        dispatch(addProductFailure())
    }
}


//CREATE USER 
export const addUser = async(user,dispatch)=>{
    dispatch(createUserStart())
    try{
        const res = await userRequest.post(`/users`, user)
        dispatch(createUserSuccess(res.data))
    }catch(err){
        dispatch(createUsersFailed())
    }
}


//UPDATE USER
export const updateUserData = async(id,user,dispatch)=>{
  const data ={id, ...user}
 
    dispatch(updateUserStart())
    try{
        const res = await userRequest.put(`/users/${id}`, data)
        dispatch(updateUserSuccess({id:id,user:user}))
    }catch(err){
        dispatch(updateUsersFailed())
    }
}

//DELETE USER
export const deleteUserData = async(id,dispatch)=>{
   
      dispatch(deleteUserStart())
      try{
          const res = await userRequest.delete(`/users/${id}`)
          dispatch(deleteUserSuccess(id))
      }catch(err){
          dispatch(deleteUsersFailed())
      }
  }
  
  

