export default interface IExchangeRate {
  data: {
    base: string,
    amount: Number,
    result?: any,
    ms: Number
  }

}