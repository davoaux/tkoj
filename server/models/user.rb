class User
  include Mongoid::Document
  include ActiveModel::SecurePassword

  has_many :notes, dependent: :destroy
  validates :name, :username, :password_digest, presence: true
  validates :username, uniqueness: true, length: { minimum: 5 }
  has_secure_password

  field :name, type: String
  field :username, type: String
  field :password_digest
  field :active, type: Boolean, default: true
  field :created_at, type: DateTime, default: -> { DateTime.now }

  def self.permitted_params(params)
    permitted = %w[_id name username password]
    params.select { |k, _| permitted.include?(k) }
  end
end
