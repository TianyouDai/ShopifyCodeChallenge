import json

data = open("waste.json").read().strip()
data = json.loads(data)

# convert HTML to plain text for identification of key terms
def removeTags(text):

    res = ""
    for letter in text:
        if letter in "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ":
            res += letter
        else:
            res += " "

    return res

objects = []

# assign uid to each item
uid = 1
for item in data:
    item["uid"] = uid
    uid += 1
    objects.append(item)

dict = {}

# build dictionary word -> uid list
# where word is every word found in the data
# uid list is a list of uid of objects that contain that word
for item in data:
    all_words  = removeTags(item["body"]).split(" ")
    all_words += removeTags(item["title"]).split(" ")
    all_words += removeTags(item["category"]).split(" ")
    all_words += removeTags(item["keywords"]).split(" ")

    for word in all_words:

        if word == " " or word == "": continue

        if not word in dict: dict[word] = []

        # no duplicates
        if not item["uid"] in dict[word]:
            dict[word].append(item["uid"])

out = open("word_map.json", 'w')
out.write(json.dumps(dict))

out = open("words.json", 'w')
out.write(json.dumps(list(dict.keys())))

out = open("objects.json", 'w')
out.write(json.dumps(objects))
