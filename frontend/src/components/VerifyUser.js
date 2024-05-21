import { useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const VerifyUser = ({children}) => {
  const { token } = useParams() 
  const verifyUser = async ()=>{
    try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/verification/${token}`)
        if(response.data.success){
            toast.success('Verification done!')
        }
    } catch (error) {
        console.log(error)
        toast.error(error?.response?.data?.message)
    }
  }
  useEffect(()=>{
    verifyUser()
  })
  return children
}

export default VerifyUser