class Transaction < ApplicationRecord
  geocoded_by :address
  after_validation :geocode

  def address
    [street, city, zip, state].compact.join(", ")
  end
end
