
App Description: <hr>

We used the Kaggle YouTube datasets to identify the top 100 YouTube channels and then used the YouTube API to retrieve the information for these channels. The retrieved information was loaded to a SQLite database and a CSV file. The database is used by the Flask app to render the HTML pages and the CSV file is used by Tableau to generate the visualizations.



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
    contains the css and js components<br>

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





