from flask import request, jsonify, Blueprint
from flask_cors import CORS
from database import cursor, database_session, execute_query
#write a query to get all available beds (id) from the same type in a dictionary like this
# {
#     "bedtype": "ICU",
#     "available_beds_ids": [5, 6, 7, 8]
# }
# {
#     "bedtype": "General",
#     "available_beds_ids": [1, 2, 3, 4]
# }
#implement the query in the function below

cursor.execute("""
        SELECT * FROM employee
        WHERE employee.dateleft IS NULL AND (employee.role = 'Doctor' :: ROLE OR employee.role = 'Nurse' :: ROLE)
    """)
active_employees = cursor.fetchall()

print(active_employees)


# @admin_view.route('/admin/all_available_beds', methods=['GET'])
# def all_available_beds():
#     all_available_beds_query = """
#         SELECT bedtype, bedid as available_beds
#         FROM bed
#         WHERE isoccupied IS NOT TRUE
#         GROUP BY bedtype, bedid
#     """
#     cursor.execute(all_available_beds_query)
#     all_avail_beds = cursor.fetchall()
#     return jsonify({"available_beds": available_beds})

