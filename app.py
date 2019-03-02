import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/YouTube_Top_Channels.sqlite"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)


Channel = Base.classes.channel
# Use Pandas to perform the sql query
stmt = db.session.query(Channel).statement
df = pd.read_sql_query(stmt, db.session.bind)


# for ch in list(df['Name']):
#     print(ch)
#     print(df.loc[df["Name"]==ch, "Subscriber_Count"])



@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/challenges")
def challenges():
    """Return the homepage."""
    return render_template("challenges.html")

@app.route("/money")
def money():
    """Return money page"""
    return render_template("money.html")

@app.route("/dataset")
def dataset():
    """Return the homepage."""
    return render_template("data.html")


@app.route("/visualization_1")
def viz1():
    """Return the visualization 1"""
    return render_template("visualization_1.html")

@app.route("/visualization_2")
def viz2():
    """Return the visualization 2"""
    return render_template("visualization_2.html")


@app.route("/visualization_3")
def viz3():
    """Return the visualization 3"""
    return render_template("visualization_3.html")



#json data
@app.route("/data")
def JSON_data():
    """Return complete JSONified dataset."""
    data = {
        "Channel_ID": df["Channel_ID"].tolist(),
        "Channel_Type": df["Channel_Type"].tolist(),
        "Name": df["Name"].tolist(),
        "Channel_Description": df["Channel_Description"].tolist(),
        "Published_Date": df["Published_Date"].tolist(),
        "Country": df["Country"].tolist(), 
        "View_Count": df["View_Count"].tolist(), 
        "Subscriber_Count": df["Subscriber_Count"].tolist(), 
        "Video_Count": df["Video_Count"].tolist(),  
        "Video_Count": df["Banner_Image"].tolist(),  
        "Daily_Average_Earning": df["Daily_Average_Earning"].tolist(),  
        "Daily_Average_Earning_High": df["Daily_Average_Earning_High"].tolist(),  
        "Daily_Average_Earning_Mid": df["Daily_Average_Earning_Mid"].tolist(),  
        "Daily_Average_Earning_Low": df["Daily_Average_Earning_Low"].tolist() 
    }
    return jsonify(data)
    #return df.to_json(orient = "records")


@app.route("/channel")
def channel_data():
    """Return list of channels and ids"""
    
    name_list = list(df["Name"])
    id_list = list(df["Channel_ID"])

    channel_list = {}
    for i in range(0, len(df)):
        channel_list[name_list[i]] = id_list[i]

    print(channel_list)
    return jsonify(channel_list)




@app.route("/channel/<channel_id>")
def channel_metadata(channel_id):
    """Return data for the specific channel."""
    
    sel = [
        Channel.Channel_ID,
        Channel.Channel_Type,
        Channel.Name,
        Channel.Channel_Description,
        Channel.Published_Date,
        Channel.Country,
        Channel.View_Count,
        Channel.Subscriber_Count,
        Channel.Video_Count,
        Channel.Banner_Image,
        Channel.Daily_Average_Earning,
        Channel.Daily_Average_Earning_High,
        Channel.Daily_Average_Earning_Low,
        Channel.Daily_Average_Earning_Mid
    ]
    results = db.session.query(*sel).filter(Channel.Channel_ID == channel_id).all()

    channel_metadata = {}
    for result in results:
        channel_metadata["Channel ID"] = result[0]
        channel_metadata["Channel Type"] = result[1]
        channel_metadata["Name"] = result[2]
        channel_metadata["Channel Description"] = result[3]
        channel_metadata["Published Date"] = result[4]
        channel_metadata["Country"] = result[5]
        channel_metadata["View Count"] = result[6]
        channel_metadata["Subscriber Count"] = result[7]
        channel_metadata["Video Count"] = result[8]
        channel_metadata["Banner Image"] = result[9]
        channel_metadata["Daily Average Earning"] = result[10]
        channel_metadata["Daily Average Earning High"] = result[11]
        channel_metadata["Daily Average Earning Mid"] = result[12]
        channel_metadata["Daily Average Earning Low"] = result[13]


    print(channel_metadata)
    return jsonify(channel_metadata)


# #Chris to try render channel.html with data populated
# @app.route("/Channel_Chris/<channel>")
# def channel_data_page(channel):
#     """Return data for the specific channel."""

#     ch = int(channel)    
#     channel_df = df.loc[df['id']== ch, :]
#     return channel_df.to_json(orient = "records")


if __name__ == "__main__":
    app.run(debug=True)


