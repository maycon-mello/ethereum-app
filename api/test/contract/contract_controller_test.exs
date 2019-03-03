defmodule AppWeb.PageControllerTest do
  use AppWeb.ConnCase

  test "GET, list contracts", %{conn: conn} do
    response =
      conn
      |> get("/contract")
      |> json_response(200)

    id =
      response
      |> Enum.at(0)
      |> Map.get("id")

    assert id !== nil
  end

  test "GET, get contract by id", %{conn: conn} do
    contract_id = "2"

    response =
      conn
      |> get("/contract/#{contract_id}")
      |> json_response(200)

    assert Map.get(response, "id") === contract_id
  end

  test "POST, create new contract", %{conn: conn} do
    type = "Some name"

    user = %{
      name: "Maycon"
    }

    response =
      conn
      |> post("/contract", %{user: user, type: type})
      |> json_response(200)

    new_id = Map.get(response, "id")

    response =
      conn
      |> get("/contract/#{new_id}")
      |> json_response(200)

    assert Map.get(response, "id") === new_id
    assert response |> Map.get("user") |> Map.get("name") === "Maycon"
    assert Map.get(response, "type") === type
  end

  test "PUT, update contract", %{conn: conn} do
    id = "2"
    type = "test"

    before_update =
      conn
      |> get("/contract/#{id}")
      |> json_response(200)

    response =
      conn
      |> put("/contract/#{id}", %{type: type})
      |> json_response(200)

    assert Map.get(response, "id") === id
    assert Map.get(response, "type") !== Map.get(before_update, "type")
    assert Map.get(response, "type") === type
  end

  test "DELETE, remove contract", %{conn: conn} do
    contract_id = 1

    conn
    |> get("/contract/#{contract_id}")
    |> json_response(200)

    conn
    |> delete("/contract/#{contract_id}")
    |> response(204)

    response =
      conn
      |> get("/contract/#{contract_id}")
      |> response(204)

    assert response === ""
  end
end
