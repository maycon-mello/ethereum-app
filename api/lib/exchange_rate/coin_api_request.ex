defmodule AppWeb.CoinApiRequest do
  use HTTPoison.Base

  def process_request_url(resource) do
    "https://rest.coinapi.io" <> resource
  end

  def process_request_headers(headers) do
    headers
    |> Enum.concat("X-CoinAPI-Key": "6DFDAE11-A5B8-465B-9E03-C996BA12129F")
  end

  def process_response_body(body) do
    body
    |> Poison.decode()
  end
end
