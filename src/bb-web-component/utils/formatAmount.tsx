export default (amount:number, countryCode:string):number=> {
    const noDecimalCountries = ['HU','JP','KR','MX'];
    if (noDecimalCountries.includes(countryCode)) {
        return amount;}
        else 
        { return amount*100}
    }