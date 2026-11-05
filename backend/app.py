import os
from uuid import UUID
from flask import Flask, jsonify, request
from supabase import create_client, Client
from postgrest import APIError
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)


app = Flask(__name__)

CORS(
    app,
    resources={r"/api/*": {"origins": "*"}},
    allow_headers="*",
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
)

missing_settings = [name for name in ('SUPABASE_URL', 'SUPABASE_KEY')
                    if not os.environ.get(name)]
if missing_settings:
    raise RuntimeError('Missing environment variables: ' + ', '.join(missing_settings))

supabase: Client = create_client(
    os.environ.get("SUPABASE_URL"),
    os.environ.get("SUPABASE_KEY")
)


@app.get('/health')
def health():
    return jsonify(status='ok')


@app.errorhandler(APIError)
def database_error(error):
    if error.code == '23505':
        return jsonify(error='Registration already exists'), 409
    app.logger.error('Database request failed: %s', error.code)
    return jsonify(error='Database request failed'), 500


@app.get('/api/events')
def list_events():
    response = supabase.table('events').select('*').execute()
    return jsonify(response.data)


@app.get('/api/events/<uuid:event_id>')
def event_details(event_id):
    response = supabase.table('events').select('*').eq('event_id', str(event_id)).execute()
    if not response.data:
        return jsonify(error='Event not found'), 404
    return jsonify(response.data[0])


@app.post('/api/registrations')
def create_registration():
    body = request.get_json(silent=True)
    if not isinstance(body, dict):
        return jsonify(error='A JSON object with event_id and student_id is required'), 400
    try:
        event_id = str(UUID(str(body.get('event_id', ''))))
    except ValueError:
        return jsonify(error='event_id must be a valid UUID'), 400

    try:
        student_id = str(UUID(str(body.get('student_id', ''))))
    except ValueError:
        return jsonify(error='student_id must be a valid UUID'), 400

    events = supabase.table('events').select('*').eq('event_id', event_id).execute()
    if not events.data:
        return jsonify(error='Event not found'), 404
    existing = (supabase.table('registrations').select('id')
                .eq('event_id', event_id).eq('student_id', student_id).execute())
    if existing.data:
        return jsonify(error='Registration already exists'), 409
    response = supabase.table('registrations').insert({
        'event_id': event_id, 'student_id': student_id
    }).execute()
    return jsonify(response.data[0]), 201


@app.get('/api/me/registrations')
def my_registrations():
    try:
        student_id = str(UUID(request.args.get('student_id', '')))
    except ValueError:
        return jsonify(error='student_id must be a valid UUID'), 400
    response = (supabase.table('registrations').select('*')
                .eq('student_id', student_id).execute())
    return jsonify(response.data)


@app.get('/api/events/<uuid:event_id>/registrations')
def event_registrations(event_id):
    event_id = str(event_id)
    events = supabase.table('events').select('*').eq('event_id', event_id).execute()
    if not events.data:
        return jsonify(error='Event not found'), 404
    response = supabase.table('registrations').select('*').eq('event_id', event_id).execute()
    return jsonify(response.data)

@app.route('/api/users', methods=['GET'])
def index():
    try:
        response = supabase.table('users').select("*").execute()
    except APIError as error:
        return f'<p>Error loading users: {error.message}</p>'

    users = response.data

    html = '<h1>Users</h1><ul>'
    for user in users:
        html += f'<li>{user["email"]}</li>'
    html += '</ul>'

    return html

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', '5000')))
