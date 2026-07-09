# --------------------------------------------
# ============================================
# © Maths Expert 2026 | All rights reserverd.
# This online mathematics learning site was created by Pablo Koussa Diaz and Noé T..
# This repository may not be copied; any copying will result in legal action.
# The website is actually intented for 8th to 9th Grade | Middle to hight school.
# Our goal is to offer free online mathematics revision, as well as advanced lessons covering the high school curriculum.
# The images used are not protected.
# ============================================
# --------------------------------------------


from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/exercice/1")
def exercice_1():
    return render_template("exercice.html")

@app.route("/exercice/2")
def exercice_2():
    return render_template("exercice2.html")

@app.route("/control/basic-logic")
def basic_logic():
    return render_template("testing_functions.html")


if __name__ == "__main__":
    port = 5000
    app.run(host="0.0.0.0", port=port)
