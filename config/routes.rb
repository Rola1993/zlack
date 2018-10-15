Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :workspaces, only: [:index, :show]
    resources :messages, only: [:index, :create, :update, :destroy]
  end
  mount ActionCable.server => '/cable'
end
