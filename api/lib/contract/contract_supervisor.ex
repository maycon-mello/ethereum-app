defmodule AppWeb.Contract.Supervisor do
  use Supervisor

  def start_link do
    Supervisor.start_link(__MODULE__, [])
  end

  def init([]) do
    children = [
      worker(AppWeb.Contract.Store, [])
    ]

    supervise(children, strategy: :one_for_one)
  end
end
