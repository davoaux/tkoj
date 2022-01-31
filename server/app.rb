# frozen_string_literal: true

require 'sinatra'
require 'sinatra/namespace'
require 'rack/cors'
require 'dotenv/load'
require 'mongoid'
require 'json'
require 'jwt'

configure do
  Mongoid.load!('config/mongoid.yml')
  require_relative 'config/initializers/mongoid'
  require_relative 'models/note'
  require_relative 'models/user'
end

set :jwt_secret, ENV['JWT_SECRET']

def generate_token(user_id)
  payload = { id: user_id, exp: Time.now.to_i + 24 * 3600 } # exp: 1 day
  JWT.encode(payload, :jwt_secret.to_s, 'HS256')
end

def verify_token(token)
  JWT.decode(token, :jwt_secret.to_s, true, { algorithm: 'HS256' })
rescue StandardError
  nil
end

before do
  @params = JSON.parse(request.body.read) if request.post? || request.put?
end

post '/register' do
  data = User.permitted_params(@params)
  user = User.create(data)
  halt 500, { error: 'user is not valid' }.to_json unless user.valid?

  status 201
  user.to_json
end

post '/login' do
  user = User.find_by(username: @params['username'])

  halt 401, { error: 'User not found' }.to_json if user.nil?
  halt 401, { error: 'Password does not match' }.to_json unless user.authenticate(@params['password'])

  token = generate_token(user.id)

  { token: token, user: user }.to_json
end

namespace '/api' do
  before do
    decoded_token = verify_token request.env['HTTP_AUTHORIZATION'].split[1]
    user_id = decoded_token[0]['id']['$oid'] unless decoded_token.nil?
    halt 401, { error: 'Authorization denied' }.to_json if user_id.nil? || User.find_by(id: user_id).nil?
  end

  helpers do
    def user
      User.find_by(id: params['id']) || halt(404, { error: 'User not found' }.to_json)
    end

    def note
      id = params['id'] || params['_id']
      Note.find_by(id: id) || halt(404, { error: 'Note not found' }.to_json)
    end
  end

  put '/change_password' do
    data = User.permitted_params(@params)
    user_updated = user.update_attributes(data)
    halt 500, { error: 'Error changing password' }.to_json unless user_updated

    { msg: 'Password updated' }.to_json
  end

  get '/users' do
    User.where(active: true).to_json
  end

  get '/users/:id' do
    user.to_json
  end

  put '/users/:id' do
    data = User.permitted_params(@params)
    user_updated = user.update_attributes(data)
    halt 500, { error: 'User update failed' }.to_json unless user_updated

    user.to_json
  end

  get '/users/:id/notes' do
    user.notes.to_json
  end

  get '/users/username/:username' do |username|
    user = User.find_by(username: username)
    halt 404, { error: 'User not found' }.to_json unless user

    user.to_json
  end

  delete '/users/:id' do
    halt 500, { error: 'User could not be deleted' }.to_json unless user.destroy

    { msg: 'User deleted', user: user }.to_json
  end

  get '/notes' do
    Note.all.to_json
  end

  get '/notes/:id' do
    note.to_json
  end

  post '/notes' do
    data = Note.permitted_params(@params)
    note = Note.create(data)
    halt 500, { error: 'Note is not valid' }.to_json unless note.valid?

    status 201
    note.to_json
  end

  put '/notes' do
    data = Note.permitted_params(@params)
    note_updated = note.update_attributes(data)
    halt 500, { error: 'Note update failed' }.to_json unless note_updated

    note.to_json
  end

  delete '/notes/:id' do
    halt 500, { error: 'Note could not be deleted' }.to_json unless note.destroy

    { msg: 'Note deleted' }.to_json
  end
end
