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

all_available_beds_query = """
        SELECT bedtype, bedid as available_beds
        FROM bed
        WHERE isoccupied IS NOT TRUE 
        ORDER BY bedtype
    """
cursor.execute(all_available_beds_query)
all_avail_bed_ids = cursor.fetchall()

final_avail_beds = {}
for bed in all_avail_bed_ids:
    b_type = bed['bedtype']
    b_id = bed['available_beds']
    if b_type not in final_avail_beds:
        final_avail_beds[b_type] = [b_id]
    else:
        final_avail_beds[b_type].append(b_id)

print(final_avail_beds)


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

