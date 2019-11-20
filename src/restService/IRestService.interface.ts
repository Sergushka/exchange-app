export default interface IRestServiceInterface {
  data: IExchangeRatesServerResponse;
}

export interface IExchangeRatesServerResponse {
  disclaimer: string;
  license: string;
  timestamp: number;
  base: string;
  rates: { [key: string]: number };
}
