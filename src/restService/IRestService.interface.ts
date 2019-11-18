export default interface IRestServiceInterface {
  data: IExchangeRatesServerResponse;
}

export interface IExchangeRatesServerResponse {
  disclaimer: string;
  license: string;
  timestamp: Date;
  base: string;
  rates: { [key: string]: number };
}
