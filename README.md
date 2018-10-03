# zlack

##Schema

users

| column name    | Data type  | details                   |
| -------------- |:-------- -:| -------------------------:|
| id             | integer    | not null, primary key     |
| username       | string     | not null, indexed         |
| email          | string     | not null, indexed, unique |
| password_digest| string     | not null                  |
| session_token  | string     | not null, indexed, unique |
| created_at     | datetime   | not null                  |
| updated_at     | datetime   | not null                  |
