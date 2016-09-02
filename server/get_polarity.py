import sys
import json

if __name__ == '__main__':
    from textblob import TextBlob
    text = sys.argv[1]
    sentences = TextBlob(text).sentences
    output = [[str(s), s.polarity] for s in sentences]
    sys.stdout.write(json.dumps(output))
    exit()
