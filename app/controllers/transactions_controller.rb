class TransactionsController < ApplicationController

  before_action :set_user, only: [:show]

  def index
    @transactions = Transaction.all
  end

  def show
  end

  private

  def set_user
    id = params[:id]
    @transaction = Transaction.find(id)
  end
end
