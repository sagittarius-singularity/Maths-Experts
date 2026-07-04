# --------------------------------------------
# ============================================
# © Maths Expert 2026 | All rights reserverd.
# This online mathematics learning site was created by Pablo Koussa Diaz and Noé Touati.
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

@app.route("/exercice-1/")
def home():
    return render_template("exercice.html")

@app.route("/control/basic-logic")
def basic_logic():
    return render_template("testing_functions.html")


if __name__ == "__main__":
    app.run()
