# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'la101', password:'19931210', img_url:'https://ca.slack-edge.com/T03GU501J-UBVJX8CB1-g959c98ec02a-48')
Workspace.create(name: 'App Academy', img_url:'')
WorkspaceMembership.create(user_id: 1, workspace_id: 1)
Channel.create(name: 'general', workspace_id: 1)
