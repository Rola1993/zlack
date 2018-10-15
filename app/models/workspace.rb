class Workspace < ApplicationRecord
  validates :name, presence: true

  has_many :workspace_memberships
  has_many :users, through: :workspace_memberships, source: :user
  has_many :channels
end
