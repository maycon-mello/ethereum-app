defmodule AppWeb.Contract.Mock do
  @contract_mocks "priv/mocks/contracts.json"

  def get_data do
    {:ok, body} = File.read(@contract_mocks)
    {:ok, json} = Poison.decode(body, as: [%AppWeb.Models.Contract{}])
    json
  end
end
