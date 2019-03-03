defmodule AppWeb.ExchangeRate.Model do
  @derive [Poison.Encoder, Jason.Encoder]
  defstruct [
    :time_close,
    :price_close
  ]
end
