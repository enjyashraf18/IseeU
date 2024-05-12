import os
import psycopg2.extras
from dotenv import load_dotenv

##############first method using url and neon directly###################

# Load .env file
load_dotenv()
# Get the connection string from the environment variable
connection_string = os.getenv('DATABASE_URL')
# Connect to the Postgres database
conn = psycopg2.connect(connection_string)
# Create a cursor object
cur = conn.cursor()
# Execute SQL commands to retrieve the current time and version from PostgreSQL
cur.execute('SELECT NOW();')
time = cur.fetchone()[0]
cur.execute('SELECT version();')
version = cur.fetchone()[0]
cur.execute('SELECT * FROM bed')
beds = cur.fetchall()
# Close the cursor and connection
cur.close()
conn.close()
# Print the results
print('Current time:', time)
print('PostgreSQL version:', version)
print('Current beds:', beds)


##############first method using url and neon directly###################

database_session = psycopg2.connect(
    database="IseeUDB",
    port="5432",
    host="ep-still-truth-a21z0m3n.eu-central-1.aws.neon.tech",
    user="IseeUDB_owner",
    password="o70CUtSaXsJK"
)
cursor = database_session.cursor(cursor_factory=psycopg2.extras.DictCursor)
database_session.set_session(autocommit=True)
# Execute SQL commands to retrieve the current time and version from PostgreSQL
cursor.execute('SELECT NOW();')
time = cursor.fetchone()[0]
cursor.execute('SELECT version();')
version = cursor.fetchone()[0]
cursor.execute('SELECT * FROM bed')
beds = cursor.fetchall()
# Close the cursor and connection
cursor.close()
database_session.close()
# Print the results
print('Current time:', time)
print('PostgreSQL version:', version)
print('Current beds:', beds)
