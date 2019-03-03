defmodule AppWeb.ExchangeRate.ControllerTest do
  use AppWeb.ConnCase

  test "GET exchange rates", %{conn: conn} do
    response =
      conn
      |> get("/exchange-rate")
      |> json_response(200)

    assert Enum.count(response) > 0
  end

  test "GET exchange rate", %{conn: conn} do
    response =
      conn
      |> get("/exchange-rate/ETH/USD")
      |> json_response(200)

    assert Enum.count(response) > 0
  end
end
