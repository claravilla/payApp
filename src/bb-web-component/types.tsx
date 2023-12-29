export type BillingAddress = {
  street: string
  houseNumberOrName: string,
  postalCode?: string,
  city: string,
  stateOrProvince?: string,
  country: string,
}


export type PaymentMethod = {
  name: string;
  type: string;
  brands?: string[];
  details?: Array<Object>;
};

export type CreditCardProps = {
  amount: number,
  billingAddress: BillingAddress,
  clientKey: string,
  countryCode: string,
  name: string,
  origin: string,
  paymentMethods: Array<PaymentMethod>,
  paymentReference: string,
  shopperIP: string,
  shopperEmail: string,
  token: string,
}

export type CardDetails = {
  brand?: string;
  checkoutAttemptId?: string;
  encryptedCardNumber: string;
  encryptedExpiryMonth: string;
  encryptedExpiryYear: string;
  encryptedSecurityCode: string;
  holderName: string;
  taxNumber?: string;
  type: string;
};

export type BrowserInfo = {
  acceptHeader: string;
  colorDepth: number;
  javaEnabled: boolean;
  language: string;
  screenHeight: number;
  screenWidth: number;
  timeZoneOffset: number;
  userAgent: string;
};

export type PaymentRequest = {
  countryCode: string;
  amount: {
    currency: string;
    value: number;
  };
  paymentReference: string;
  returnUrl: string;
  shopperIP: string;
  paymentMethod: {
    type: string;
    encryptedCardNumber: string;
    encryptedExpiryMonth: string;
    encryptedExpiryYear: string;
    holderName: string;
    encryptedSecurityCode: string;
  };
  browserInfo?: BrowserInfo;
  billingAddress: {
    street: string;
    houseNumberOrName: string;
    postalCode?: string;
    city: string;
    stateOrProvince?: string;
    country: string;
  };
  origin: string;
};