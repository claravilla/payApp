import { createContext, useEffect, useState} from "react";


type LegoPaymentIdContextType = {
    legoPaymentId: string;
    updateLegoPaymentId: Function;
  }

  const LegoPaymentIdContext = createContext<LegoPaymentIdContextType>({legoPaymentId: "", updateLegoPaymentId: () => ""});

  function LegoPaymentIdContextProviderWrapper(props: any) {
    const [legoPaymentId, setLegoPaymentId] = useState<string>("");

    const updateLegoPaymentId = (value: string) => {
        setLegoPaymentId(value);  
    }
    
    return (
        <LegoPaymentIdContext.Provider value={{ legoPaymentId: legoPaymentId, updateLegoPaymentId }}>
          {props.children}
        </LegoPaymentIdContext.Provider>
      );

  }


  export { LegoPaymentIdContext, LegoPaymentIdContextProviderWrapper };