class Note
  include Mongoid::Document

  belongs_to :user
  validates :title, presence: true

  field :title, type: String
  field :content, type: String
  field :tags, type: Array

  def self.permitted_params(params)
    permitted = %w[_id title content user_id tags]
    params.select { |k, _| permitted.include?(k) }
  end
end
