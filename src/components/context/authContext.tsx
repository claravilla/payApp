import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Buffer } from "buffer";

type AuthContextType = {
  token: string,
  refreshToken: Function;
}
const AuthContext = createContext<AuthContextType>({token: "", refreshToken: () => ""});

function AuthContextProviderWrapper(props: any) {
  const [token, setToken] = useState<string>("");

    const refreshToken: Function = async()=> {

      try {
        const dataString = `grant_type=client_credentials&client_id=${process.env.REACT_APP_CLIENT_ID}`;
        const basicAuthString = Buffer.from(
          `${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`
        ).toString("base64");
      
        const result = await 
        axios.post(
          `${process.env.REACT_APP_AUTH_URL}`,
          dataString,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Basic ${basicAuthString}`,
            },
          }
        )
        
     
        setToken(result.data.access_token);
        return result.data.access_token;
      }
     catch(e) {
      console.log('could not refresh token', e);
     }
    };
    
  useEffect(() => {
    refreshToken();
  }, []);

    return (
      <AuthContext.Provider value={{ token: token, refreshToken }}>
        {props.children}
      </AuthContext.Provider>
    );
  }


export { AuthContext, AuthContextProviderWrapper };
