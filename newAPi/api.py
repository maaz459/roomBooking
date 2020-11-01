import sqlite3
from flask import Flask, request, jsonify
import json

app = Flask(__name__)


def db_connection():
    conn = None
    try:
        conn = sqlite3.connect('rooms.sqlite')
    except sqlite3.Error as e:
        print(e)
    return conn


@app.route('/rooms', methods=["GET", "POST"])
def rooms():
    conn = db_connection()
    cursor = conn.cursor()

    if request.method == "GET":
        cursor = conn.execute("Select * from rooms")
        rooms = [
            dict(roomName=row[0], day=row[1], time=row[2], initials=row[4])
            for row in cursor.fetchall()
        ]
        if rooms is not None:
            return jsonify(rooms)

    if request.method == "POST":
        roomName = request.form["roomName"]
        time = request.form["time"]
        day = request.form["day"]
        initials = request.form["initials"]
        sql = "INSERT INTO rooms (roomName,time,day,initials) VALUES (?,?,?,?)"
        cursor = cursor.execute(sql, (roomName, time, day, initials))
        conn.commit()
        return f"Book with the id: 0 created successfully", 201
