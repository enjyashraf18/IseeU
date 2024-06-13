from flask import Flask
from login import login
from register import register
from nurse_view import nurse_view
from doctor_view import doctor_view
from admin_view import admin_view

app = Flask(__name__)
app.register_blueprint(login)  #, url_prefix="/login"
app.register_blueprint(register)
app.register_blueprint(nurse_view)
app.register_blueprint(doctor_view)
app.register_blueprint(admin_view)



app.config["SECRET_KEY"] = "SECRET_KEY"


@app.route("/")
def welcome_page():
    return "<h1> Welcome </h1>"


if __name__ == '__main__':
    app.run(debug=True)
