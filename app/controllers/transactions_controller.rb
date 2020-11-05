class TransactionsController < ApplicationController

  before_action :set_user, only: [:show]

  def index
    per_page = 10
    @transactions = if params[:l]
                        #sw_lat, sw_lng, ne_lat, ne_lng = params[:l].split(",")
                        #center = Geocoder::Calculations.geographic_center([[sw_lat, sw_lng], [ne_lat, ne_lng]])
                        #distance = Geocoder::Calculations.distance_between(center, [sw_lat, sw_lng])
                        #box = Geocoder::Calculations.bounding_box(center, distance)
                        #Transaction.within_bounding_box(box)

                        Transaction.search('*',page: params[:page], per_page: per_page, where: {
                          location: {
                            top_left: {
                              lat: ne_lat, 
                              lon: sw_lng,
                              }, 
                            bottom_right: {
                              lat: sw_lat, 
                              lon: ne_lng,
                              }
                            }
                        })
                      elsif params[:near]
                        # Transaction.near(params[:near]).per(per_page)
                        location = Geocoder.search(params[:near]).first
                        Transaction.search('*',page: params[:page], per_page: per_page,
                         boost_by_distance: {
                           location: {
                             origin: {
                               lat: location.latitude, 
                               lon: location.longitude
                              }
                            }
                          },
                         where: {
                          location: {
                            near: {
                              lat: location.latitude, 
                              lon: location.longitude
                              }, 
                            within: "50mi"
                          }
                        })
                      else
                        Transaction.all.page(params[:page]).per(per_page)
                      end
  end

  def show
  end

  private

  def set_user
    id = params[:id]
    @transaction = Transaction.find(id)
  end
end
