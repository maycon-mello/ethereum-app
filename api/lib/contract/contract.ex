defmodule AppWeb.Models.Contract do
  @derive [Poison.Encoder, Jason.Encoder]
  defstruct [
    :id,
    :user,
    :address,
    :balance,
    :currency,
    :type,
    :config,
    :date,
    :amountInUsd
  ]
end
