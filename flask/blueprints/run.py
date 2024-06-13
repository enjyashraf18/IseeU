from flask import Flask
from login import login

app = Flask(__name__)
app.register_blueprint(login)
SECRET_KEY = "IseeU is the best"

@app.route("/")
def welcome_page():
    return "<h1> Welcome </h1>"

if __name__ == '__main__':
    app.run(debug=True)
