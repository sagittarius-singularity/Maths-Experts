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
