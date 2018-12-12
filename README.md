# OTP Based Authentication

This RESTful api provides OTP based authentication. It is written in Node.js. MongoDB was used as the database. Node.js and MongoDB must be installed to the operation system.

# Settings
1-) Install all dependencies with "npm install" command. <p>
2-a) Create a ".env" file in your project folder and open it for edit. It should be two different api key in ".env" file to sign JWT: First one APISECRETKEY, second one TEMPORARILYTOKENKEY. Because there are two types of jwt in this api for security. The jwt which is signed with TEMPORARILYTOKENKEY is expires in 15 minutes. This jwt must be used only for confirm OTP. And the jwt which is signed with APISECRETKEY is expires in 30 days. This jwt must be used for validate all endpoint under /api/... <br>
2-b) Mail service settings should  be in the ".env" file too. There are three variables for that: <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1-) NODEMAILER_HOST variable is for mail service smtp info. For example: "NODEMAILER_HOST = smtp-mail.outlook.com". <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2-) NODEMAILER_USER variable is for sender email address. For example "NODEMAILER_USER = johndoe@hotmail.com". <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3-) NODEMAILER_PASS variable is for sender email password. <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Briefly ".env" file should look like this: <p> 
<i>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NODEMAILER_HOST = smtp-mail.outlook.com
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NODEMAILER_USER = johndoe@hotmail.com
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NODEMAILER_PASS = FoobarPassword
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;APISECRETKEY = LoremIpsum
<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TEMPORARILYTOKENKEY = DolorSitAmet
</i>

<p>3- "/helper/db.js" file should be edited to connect to the MongoDB database. In case of working on the localhost, just open the db.js file and edit "databasename". But if it's wanted to work on a server like "mongolab", change "<i>mongodb://localhost/databasename</i>" with server database connection settings. For example: "<i>mongodb://db_user_name:db_user_password@db.mlab.com:port_number/databasename</i>". 

# Routes-Endpoints
| Route | HTTP Verb	 | POST body	 | Description	 |
| --- | --- | --- | --- |
| /getotp | `POST` | {email:'dolorsit@amet.com'} | Sends an otp to users' email and response a token in a json. This token should be sent back with otp to "/login" endpoint.|
| /login | `POST` | { otp:'loremipsum' }  | Login with otp. Generates a 30 days token.|
| /api/logout | `POST` | Empty | Invalidates token. |

# Usage
1- As understood, only "/getotp" endpoint doesn't require a token. Rest of routes needs token. All tokens can be sent with "x-access-token" key in the header or with "token" key in the post body. If some endpoint under "/api/..." route will be used in the future with GET method, tokens can be sent with "token" key-parameter in the GET query. Api will work. This REST api accepts token in every way but prefered way is sending token with header. <br>
2- All responses include a json like "{success: true/false, message: "Some info"}"
<p>Enjoy!