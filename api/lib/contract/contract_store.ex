defmodule AppWeb.Contract.Store do
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, %{}, name: :contract_store)
  end

  def init(_) do
    {:ok, AppWeb.Contract.Mock.get_data()}
  end

  def get_contracts() do
    GenServer.call(:contract_store, {:get_contracts})
  end

  def get_contract(id) do
    GenServer.call(:contract_store, {:get_contract, id})
  end

  def add_contract(contract) do
    GenServer.call(:contract_store, {:add_contract, contract})
  end

  def update_contract(id, contract) do
    GenServer.call(:contract_store, {:update_contract, id, contract})
  end

  def remove_contract(id) do
    GenServer.call(:contract_store, {:remove_contract, id})
  end

  def handle_call({:get_contract, id}, _from, state) do
    result =
      state
      |> Enum.find(&(Map.get(&1, :id) === id))

    {:reply, result, state}
  end

  def handle_call({:get_contracts}, _from, state) do
    {:reply, state, state}
  end

  def handle_call({:add_contract, contract}, _from, state) do
    state = [contract | state]
    {:reply, state, state}
  end

  def handle_call({:remove_contract, idToRemove}, _from, state) do
    state =
      state
      |> Enum.filter(fn contract -> Map.get(contract, :id) !== idToRemove end)

    {:reply, state, state}
  end

  def handle_call({:update_contract, id, contract}, _from, state) do
    state =
      state
      |> Enum.map(fn value ->
        if Map.get(value, :id) === id, do: contract, else: value
      end)

    {:reply, state, state}
  end
end
