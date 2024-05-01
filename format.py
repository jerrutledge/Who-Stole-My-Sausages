import os
import re

outfilename = "output.twee"

outputlines = []
with open("Who Stole My Sausages_.twee") as infile:
    data = infile.readlines()
    regex = re.compile(r'(\[\[.*\]\])', re.S)
    choices = []
    for line in data:
        if line[0:3] == ":: ":
            if len(choices) > 0:
                outputlines.append("<ul>\n")
                for choice in choices:
                    outputlines.append(regex.sub(r'<li>\1</li>', choice))
                outputlines.append("</ul>\n")
                choices = []
            # we've happened on a new block
            outputlines.append(line)
            continue
        if regex.search(line):
            # this is a choice in the choices group
            choices.append(line)
            continue
        # otherwise
        if (line.strip(" ")=="\n"):
            # skip consecutive line breaks
            continue
        outputlines.append(line)



with open(outfilename, mode="w") as outfile:
    outfile.writelines(outputlines)

imgnames = [os.path.join(dirpath,f)[2:] for (dirpath, dirnames, filenames) in os.walk("./img") for f in filenames]
imgnames = str(imgnames) + ";"


# Read contents from file as a single string
file_handle = open("sausage-script.js", 'r')
file_string = file_handle.read()
file_handle.close()

# Use RE package to allow for replacement (also allowing for (multiline) REGEX)
file_string = (re.sub("\[\]; // image list is replaced in python script", imgnames, file_string))

# Write contents to file.
# Using mode 'w' truncates the file.
file_handle = open("new-sausage-script.js", 'w')
file_handle.write(file_string)
file_handle.close()