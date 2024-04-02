from os import listdir, mkdir

from data.constants import BASEDIR, app

try:
    from services import views
except FileNotFoundError:
    all_dirs = listdir(BASEDIR)
    if 'files' not in all_dirs:
        mkdir(f'{BASEDIR}/files')
    if 'logs' not in all_dirs:
        mkdir(f'{BASEDIR}/logs')

    from services import views


app.add_url_rule("/", methods=["GET", "POST"], view_func=views.index)

app.add_url_rule("/all-notes", methods=["GET"], view_func=views.all_notes)
app.add_url_rule("/note/<note_name>", methods=["GET", "POST"], view_func=views.note)

app.add_url_rule("/create-note", methods=["GET", "POST"], view_func=views.create_note)
app.add_url_rule("/delete-note/<note_name>", methods=["GET", "POST"], view_func=views.delete_note)

app.add_url_rule("/logout", methods=["GET", "POST"], view_func=views.logout)


if __name__ == "__main__":
    # app.run(debug=True, host='0.0.0.0', port='5000')
    app.run(debug=False, host='0.0.0.0', port='8080')
