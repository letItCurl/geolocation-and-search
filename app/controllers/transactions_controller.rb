class TransactionsController < ApplicationController

  before_action :set_user, only: [:show]

  def index
    @transactions = if params[:l]
                        sw_lat, sw_lng, ne_lat, ne_lng = params[:l].split(",")
                        center = Geocoder::Calculations.geographic_center([[sw_lat, sw_lng], [ne_lat, ne_lng]])
                        distance = Geocoder::Calculations.distance_between(center, [sw_lat, sw_lng])
                        box = Geocoder::Calculations.bounding_box(center, distance)
                        Transaction.within_bounding_box(box)
                      elsif params[:near]
                        Transaction.near(params[:near])
                      else
                        Transaction.all
                      end
    @transactions = @transactions.page(params[:page]).per(20)
  end

  def show
  end

  private

  def set_user
    id = params[:id]
    @transaction = Transaction.find(id)
  end
end
