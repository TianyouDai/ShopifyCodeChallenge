import json

# convery the python dictionary in word_map.json
# into an sql query, so we can upload it to the DB

word_map = open("word_map.json").read().strip()
word_map = json.loads(word_map)

# insert into words (word, uids) values ('hello', Array[1,2,3,4]);
out = open("words_load.sql", 'w')

query = []
for k in word_map:
    for uid in word_map[k]:
        query.append(f"('{k}', {uid})")

query = ",".join(query)
out.write(f"insert into words (word, uid) values {query};")
