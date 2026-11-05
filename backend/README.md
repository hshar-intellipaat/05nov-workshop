# Deploy the backend to Render

Push this project to a GitHub repository, including the root `render.yaml`.
In Render, select **New > Blueprint**, connect the repository, and enter
`SUPABASE_URL` and `SUPABASE_KEY` when prompted. Use the values from your local
environment. The `.env` file and virtual environment are excluded from Git.

Alternatively, create a **Web Service** with these settings:

| Setting | Value |
| --- | --- |
| Language | Python 3 |
| Root Directory | `backend` |
| Build Command | `pip install -r requirements.txt` |
| Start Command | `gunicorn app:app --bind 0.0.0.0:$PORT --access-logfile - --error-logfile -` |
| Health Check Path | `/health` |

Add `SUPABASE_URL` and `SUPABASE_KEY` in the service's Environment settings.
If uploading only the contents of `backend` as the repository root, leave Root
Directory blank and use the manual Web Service settings above.

After deployment, `GET https://<service>.onrender.com/health` should return
`{"status":"ok"}`. This checks the web process; use `/api/events` to check
database connectivity and table permissions.

All API routes are public. Database access still follows the Supabase key's
permissions and the project's database policies.

To run locally:

```sh
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Fill in the Supabase values in .env.
python app.py
```

Deployment references: [Flask on Render](https://render.com/docs/deploy-flask)
and [Render Blueprints](https://render.com/docs/blueprint-spec).
