defmodule AppWeb.ExchangeRate.StoreTest do
  use ExUnit.Case, async: true
  alias AppWeb.ExchangeRate.Store

  test "expect to get exchange rates" do
    rates = Store.get_rates()
    assert Enum.count(rates) > 0
  end

  # TODO: Improve this test
  test "expect to set exchange rates" do
    rates =
      Store.set_rates([
        %{
          prop: "test"
        }
      ])

    assert Enum.count(rates) === 1
  end
end
