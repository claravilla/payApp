function Error ({message, legoPaymentId}:{message: string, legoPaymentId?: string}) {

 return <section className='error-container'>
       <p>{message}</p>
       {legoPaymentId ? <p><span style={{color:'black', fontWeight:'normal'}}>Your legoPaymentId is </span>{legoPaymentId}</p>:null}

      </section> 
}

export default Error;