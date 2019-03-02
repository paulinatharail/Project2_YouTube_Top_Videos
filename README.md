
App Description: <hr>
Visit our site https://project2-youtube.herokuapp.com/visualization_3: Heroku App

Our project was to discover what a top YouTube channel looks like. In order to do this, we found a top 100 list of youtube channels on Kaggle that was organized by . Through that, we took their top 100 list and then scraped socialblade for their current data. We also used the YouTube API to retrieve the information for these channels. The retrieved information was loaded to a SQLite database and a CSV file. The database is used by the Flask app to render the HTML pages and the CSV file is used by Tableau to generate the visualizations.



<hr>

Contents of the Git Repo:<hr>


data:
-----
    1) Top83_YouTube_Channels.csv: Channel information extracted using YouTube Data API.
    2) kaggle_data.csv: Used this dataset to shortlist the top 100 youtube channels based on their rank.


db:
-------
    1) YouTube_Top_Channels.sqlite database containing the top 83 youtube channels retrieved with the YouTube API.

static: 
-------
    contains the css and js components

    a) css folder:
        1) bootstrap.min.css: Bootstrap css
        2) style.css: local css

    b) js folder: 
        1) logic.js: javascript to add interactivity to pages.


templates: 
----------
contains the HTML components
    1) challenges.html
    2) data.html
    3) index.html: landing page
    4) money.html
    5) visualization_1.html
    6) visualization_2.html
    7) visualization_3.html


Flask app:
-----------
app.py


Tableau visualizations:
------------------------
youtube_book.twb 







Jupyter Notebooks:
---------------------
    1) YouTube_Data_Integration.ipynb





