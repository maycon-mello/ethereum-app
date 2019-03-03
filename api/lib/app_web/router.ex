defmodule AppWeb.Router do
  use AppWeb, :router

  pipeline :api do
    plug CORSPlug, origin: "*"
    plug :accepts, ["json"]
  end

  scope "/contract", AppWeb do
    pipe_through :api

    get "/", PageController, :index
    get "/:id", PageController, :get_contract
    delete "/:id", PageController, :remove_contract
    put "/:id", PageController, :update_contract
    post "/", PageController, :add_contract
    options "/", PageController, :options
    options "/:id", PageController, :options

  end

  scope "/exchange-rate", AppWeb do
    pipe_through :api

    get "/", ExchangeRate.Controller, :index
    get "/:base_currency/:quote_currency", ExchangeRate.Controller, :get_rate
  end
end
