User

POST /login
req
{"loginName": String "password": String}
res 200
{
"result": [
{
name: String,
loginName: String,
email: String,
phone: String,
photo: String,
usergroup: String,
}
]
}
res error
{
"status": 401,
"message": `Sorry, the member name and password you entered do not match. Please try again`
}
or
{
"status": 400,
"message": "Invalid data"
}

GET users/get
res
[
{
_id:String,
userId: Number,
loginName: String,
email: String,
phone: String,
photo: String,
usergroup: String,
lastVisit: Number,
registrated: Number,
online: Boolean
}
]

POST /users/create
req
{"loginName": String, - required!!!
"password": String, - required!!!
"email": String,
"phone": String  
 }
res
if OK
{ status: "1", result: true }
else
{ status: "0", error_message: String }
