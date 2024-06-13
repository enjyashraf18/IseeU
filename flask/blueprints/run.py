from flask import Flask
from login import login
from register import register

app = Flask(__name__)
app.register_blueprint(login) #, url_prefix="/login"
app.register_blueprint(register)

app.config["SECRET_KEY"] = "SECRET_KEY"

@app.route("/")
def welcome_page():
    return "<h1> Welcome </h1>"

if __name__ == '__main__':
    app.run(debug=True)
