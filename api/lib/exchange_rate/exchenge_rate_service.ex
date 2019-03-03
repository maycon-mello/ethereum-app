defmodule AppWeb.ExchangeRatesService do
  def get_rates do
    limit = 10
    datetime = DateTime.utc_now()
    month = datetime.month()
    year = datetime.year()
    day = datetime.day()

    time_end = Calendar.ISO.date_to_string(year, month, day) <> "T00:00:00"

    endpoint = "/v1/quotes/BITSTAMP_SPOT_ETH_USD/history?time_end=#{time_end}&limit=#{limit}"

    case AppWeb.CoinApiRequest.get(endpoint) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} -> {:ok, body}
      {:ok, %HTTPoison.Response{status_code: 401}} -> %{error: :unauthorized}
      _ -> %{error: "Unexpect error"}
    end
  end

  def get_rate(base_currency, quote_currency) do
    endpoint = "/v1/exchangerate/#{base_currency}/#{quote_currency}"

    case AppWeb.CoinApiRequest.get(endpoint) do
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} -> {:ok, body}
      {:ok, %HTTPoison.Response{status_code: 401}} -> %{error: :unauthorized}
      _ -> %{error: "Unexpect error"}
    end
  end
end
