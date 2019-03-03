defmodule AppWeb.ExchangeRate.Store do
  use GenServer

  def start_link do
    GenServer.start_link(__MODULE__, %{}, name: :exchange_rate_store)
  end

  def init(_) do
    {:ok, AppWeb.ExchengeRate.Mock.get_data()}
  end

  def get_rates() do
    GenServer.call(:exchange_rate_store, {:get_rates})
  end

  def set_rates(rates) do
    GenServer.call(:exchange_rate_store, {:set_rates, rates})
  end

  def handle_call({:get_rates}, _from, state) do
    {:reply, state, state}
  end

  def handle_call({:set_rates, rates}, _from, _state) do
    state = rates
    {:reply, state, state}
  end
end
