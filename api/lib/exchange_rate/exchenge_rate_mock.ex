defmodule AppWeb.ExchengeRate.Mock do
  @mocks_path "priv/mocks/rates.json"

  def get_data do
    {:ok, body} = File.read(@mocks_path)
    {:ok, json} = Poison.decode(body, as: [%AppWeb.ExchangeRate.Model{}])
    json
  end
end
