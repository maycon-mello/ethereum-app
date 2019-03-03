defmodule KV.BucketTest do
  use ExUnit.Case, async: true
  alias AppWeb.Contract.Store

  test "expect to get contracts" do
    contract = Store.get_contract("1")
    assert Map.get(contract, :id) === "1"
  end

  test "expect to add contracts" do
    id = "#{Enum.random(20..200)}"

    new_contract = %{
      id: id,
      name: "New user",
      email: "new@test.com"
    }

    Store.add_contract(new_contract)

    contract = Store.get_contract(id)

    assert Map.get(contract, :id) === id
    assert Map.get(contract, :name) === Map.get(new_contract, :name)
    assert Map.get(contract, :email) === Map.get(new_contract, :email)
  end

  test "expect to update contracts" do
    contract = Store.get_contract("1")
    new_name = "Updated name"
    contract = Map.put(contract, :name, new_name)

    Store.update_contract("1", contract)
    contract = Store.get_contract("1")

    assert Map.get(contract, :name) === new_name
  end

  test "expect to remove contracts" do
    id = Enum.random(20..200)

    new_contract = %{
      id: id,
      name: "New user",
      email: "new@test.com"
    }

    Store.add_contract(new_contract)

    Store.remove_contract(id)

    contract = Store.get_contract(id)

    assert contract === nil
  end
end
