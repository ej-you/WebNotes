from services import views

from data.constants import app


app.add_url_rule("/", methods=["GET", "POST"], view_func=views.index)

app.add_url_rule("/all-notes", methods=["GET"], view_func=views.all_notes)
app.add_url_rule("/note/<note_name>", methods=["GET", "POST"], view_func=views.note)

app.add_url_rule("/create-note", methods=["GET", "POST"], view_func=views.create_note)
app.add_url_rule("/delete-note/<note_name>", methods=["GET", "POST"], view_func=views.delete_note)

app.add_url_rule("/logout", methods=["GET", "POST"], view_func=views.logout)


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port='5000')
