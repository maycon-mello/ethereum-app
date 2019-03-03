defmodule AppWeb.ExchangeRate.Controller do
  use AppWeb, :controller
  alias AppWeb.ExchangeRate.Store
  alias AppWeb.ExchangeRatesService;

  def index(conn, _params) do
    case ExchangeRatesService.get_rates do
      {:ok, body} -> json(conn, body)
      _ -> json(conn, Store.get_rates)
    end
  end

  def get_rate(conn, params) do
    base_currency = Map.get(params, "base_currency")
    quote_currency = Map.get(params, "quote_currency")

    case ExchangeRatesService.get_rate(base_currency, quote_currency) do
      {:ok, body} -> json(conn, body)
      _ -> json(conn, %{
        rate: 133.17467323630283,
        time: "2019-03-04T11:28:06.4497735Z"
      })
    end
  end
end

