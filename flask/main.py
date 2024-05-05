import psycopg2.extras
from absl.flags import ValidationError
from flask import Flask, render_template, request, redirect, url_for, session, flash

database_session = psycopg2.connect(
    database="social_media",
    port="5432",
    host="localhost",
    user="postgres",
    password="2003"
)
cursor = database_session.cursor(cursor_factory=psycopg2.extras.DictCursor)

app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'


def validate_username_register(username):
    cursor.execute('SELECT name FROM users_table WHERE name = %s', (username,))
    user = cursor.fetchone()
    if user:
        raise ValidationError('That username is taken. Please choose a different one.')
        # return False
    return True


def validate_email_register(email):
    cursor.execute('SELECT email FROM users_table WHERE email = %s', (email,))
    user = cursor.fetchone()
    if user:
        raise ValidationError('That email is taken. Please choose a different one.')
        # return False
    return True


@app.route('/')
def home():
    return render_template('login.html')


@app.route('/profile')
def profile():
    name = request.args.get('name')
    age = request.args.get('age')
    profile_image = request.args.get('profile_pic')
    gender = request.args.get('gender')
    return render_template('PProfile.html', age=age, name=name, profile_pic=profile_image, gender=gender)


@app.route("/login", methods=['GET', 'POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    print(email, password)
    cursor.execute('SELECT email, password FROM users_table WHERE email = %s', (email,))
    user = cursor.fetchone()
    if user and user.get(password) == password:
        cursor.execute('SELECT * FROM users_table WHERE email = %s', (email,))
        user = cursor.fetchone()
        name = user.get('name')
        age = user.get('age')
        email = user.get('email')
        gender = user.get('gender')
        facebook = user.get('facebook')
        instagram = user.get('instagram')
        return redirect(url_for('PProfile.html', name=name, age=age
                                , email=email, gender=gender, face_url=facebook, insta_url=instagram))
    else:
        flash('Login Unsuccessful. Please check email and password', 'danger')
    return render_template('login.html')


@app.route('/logout')
def logout():
    session.clear()


@app.route("/register", methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        if validate_email_register(email) and validate_username_register(name):
            cursor.execute(
                "INSERT INTO users_table (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
            database_session.commit()
            flash('Your account has been created! You are now able to log in', 'success')
    return render_template('register.html')
    #     return redirect(url_for('login'))
    # else:
    #     return 'this account is already registered'


if __name__ == '__main__':
    app.run(debug=True)
