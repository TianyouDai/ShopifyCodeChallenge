import json
import base64

objects = json.loads(open("objects.json").read().strip())

out = open("objects_load.sql", 'w')

query = []
for item in objects:
    uid = item["uid"]
    obj_b64_string = base64.b64encode(json.dumps(item).encode())
    query.append(f"({uid}, '{obj_b64_string.decode()}')")

query = ",".join(query)

out.write(f"insert into objects (uid, object) values {query};")
