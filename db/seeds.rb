# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
users = User.create([
    { username: "pikachu", email: "pik@chu.com", password: "whatever" },
    { username: "charmander", email: "char@mander.com", password: "whatever" },
    { username: "porygon", email: "pory@gon.com", password: "whatever" },
    { username: "abra", email: "ab@ra.com", password: "whatever" },
    { username: "magikarp", email: "magi@karp.com", password: "whatever" }
  ])
