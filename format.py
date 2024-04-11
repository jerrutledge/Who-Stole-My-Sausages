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
        outputlines.append(line)



with open(outfilename, mode="+a") as outfile:
    outfile.writelines(outputlines)