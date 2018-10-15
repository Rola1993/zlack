class WorkspaceMembership < ApplicationRecord
  validates :user_id, :workspace_id, presence: true

  belongs_to :user

  belongs_to :workspace
end
