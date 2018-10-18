# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create(username: 'la101', password:'19931210')
Workspace.create(name: 'App Academy', img_url:'', user_ids:[1])
Channel.create(name: 'general', workspace_id: 1, user_ids:[1])
