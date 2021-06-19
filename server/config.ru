# frozen_string_literal: true

require './app'

use Rack::Cors do
  allow do
    origins '*'
    resource '*', headers: :any, methods: %i[get post delete put patch options head]
  end
end

run Sinatra::Application
