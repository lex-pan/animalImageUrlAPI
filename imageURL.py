# gets a single image url from the google images database
# gets the cached data from the preloaded page

from bs4 import BeautifulSoup
import requests
import smtplib
from flask import Flask, jsonify, request

def generate_search_url(animalName):
    url_template = "https://www.google.com/search?q={}&tbm=isch"
    url = url_template.format(animalName)
    return url

server = Flask("retrieve image url")
    
#extracting the html from the page
def get_image_url(animalName):
    search_url = generate_search_url(animalName)
    #sends a request to the page, which sends back status code and html 
    response = requests.get(search_url)

    #converts the response into html 
    soup = BeautifulSoup(response.text, "html.parser")

    # name of class with image link
    image_class = "yWs4tf"
    #find first img with the matching tag
    image_html = soup.find_all('img', class_=image_class)
    #extract the src/link of the image
    img_src = image_html[0]['src']
    return img_src

#format of flask request on local server http://127.0.0.1:5000/?name={animalName}
#format of flask request on production server https://animalimageapi.onrender.com/?name={animalName}

@server.route('/')
def send_data():
    animalName = request.args.get('name')
    image_url = get_image_url(animalName)
    return jsonify(result=image_url)

# server.run()    run this command while testing, do not use in production