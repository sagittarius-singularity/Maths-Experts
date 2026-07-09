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


from flask import Flask, session, redirect, url_for, render_template, request

app = Flask(__name__)
app.secret_key = "tarsthebest2014"

@app.route("/", methods=["GET", "POST"])
def main():
    if request.method == "POST":
        action = request.form.get('action')
        if action == "continueBtn":
            session['main_completed'] = True
            return redirect(url_for('basic_logic'))
    return render_template("index.html")

@app.route("/control/basic-logic", methods=["GET", "POST"])
def basic_logic():
    if not session.get('main_completed'):
        return redirect(url_for('main'))

    if request.method == "POST":
        action = request.form.get('action')
        if action == "continueBtn":
            session['testing_functions_completed'] = True
            return redirect(url_for('exercice_1'))
            
    return render_template("testing_functions.html")

@app.route("/exercice/1", methods=["GET", "POST"])
def exercice_1():
    if not session.get('testing_functions_completed'):
        return redirect(url_for('basic_logic'))

    if request.method == "POST":
        action = request.form.get('action')
        if action == "continueBtn":
            session['exercice_1_completed'] = True
            return redirect(url_for('exercice_2'))

    return render_template("exercice.html")

@app.route("/exercice/2", methods=["GET", "POST"])
def exercice_2():
    if not session.get('exercice_1_completed'):
        return redirect(url_for('exercice_1'))

    if request.method == "POST":
        action = request.form.get('action')
        if action == "continueBtn":
            session['exercice_2_completed'] = True
            return redirect(url_for('exercice_3'))

    return render_template("exercice2.html")

if __name__ == "__main__":
    port = 5000
    app.run(host="0.0.0.0", port=port)