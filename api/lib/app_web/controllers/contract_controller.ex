defmodule AppWeb.PageController do
  use AppWeb, :controller
  alias AppWeb.Contract.Store
  # alias AppWeb.ExchangeRatesService

  def index(conn, _params) do
    contracts = Store.get_contracts()
    json(conn, contracts)
  end

  def get_contract(conn, params) do
    id = Map.get(params, "id")

    contract = Store.get_contract(id)

    if contract === nil do
      conn |> send_resp(204, "")
    else
      json(conn, contract)
    end
  end

  def remove_contract(conn, params) do
    id = Map.get(params, "id")
    Store.remove_contract(id)
    conn |> send_resp(204, "")
  end

  def update_contract(conn, params) do
    id = Map.get(params, "id")

    updated_contract = %{
      id: id,
      # Should lookup inside the map to get just the allowed attributes
      user: Map.get(params, "user"),
      # Same for config
      config: Map.get(params, "config"),
      balance: Map.get(params, "balance"),
      currency: Map.get(params, "currency"),
      type: Map.get(params, "type"),
      date: Map.get(params, "date"),
      amountInUsd: Map.get(params, "amountInUsd"),
      address: Map.get(params, "address")
    }

    Store.update_contract(id, updated_contract)

    contract = Store.get_contract(id)

    json(conn, contract)
  end

  # def get_rates(conn, _params) do
  #   rates = ExchangeRatesService.get_rates()
  #   json(conn, rates)
  # end

  def add_contract(conn, params) do
    contract = %{
      id: UUID.uuid1(),
      # Should lookup inside the map to get just the allowed attributes
      user: Map.get(params, "user"),
      # Same for config
      config: Map.get(params, "config"),
      balance: Map.get(params, "balance"),
      currency: Map.get(params, "currency"),
      type: Map.get(params, "type"),
      date: Map.get(params, "date"),
      amountInUsd: Map.get(params, "amountInUsd"),
      address: Map.get(params, "address")
    }

    Store.add_contract(contract)

    json(conn, contract)
  end
end

# url = "http://localhost:4001/rest/notes?currentPage=0"
# {:ok, %{status_code: 200, body: body}} = AppWeb.QuotesRequest.get("2019-02-14T00:00:00")
# case HTTPoison.get("http://localhost:4001/rest/notes?currentPage=0") do
# {:ok, %{status_code: 200, body: body}} -> Poison.decode!(body)
# {:ok, %{status_code: 404}} ->
# do something with a 404

# {:error, %{reason: reason}} ->
# do something with an error
# end
# IO.inspect rates
