import {useState, useEffect, useContext, createContext} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const [auth,setAuth] = useState({})
    const isAuthNull = auth.user===false
    useEffect(()=>{
      const parsedData = "true" === localStorage.getItem('auth')
      if(parsedData){
        setAuth({
          user:parsedData.user
        })
      }
    },[isAuthNull])
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

//custom hook
const useAuth = ()=>useContext(AuthContext)

export {useAuth, AuthProvider}