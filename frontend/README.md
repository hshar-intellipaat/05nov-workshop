# CampusPulse frontend

Serve this directory as a static website. For local development:

```sh
python3 -m http.server 8080 --directory frontend
```

Open http://localhost:8080. The four screens share `assets/app.js` and
`assets/app.css`. The API base URL is `https://zero5nov-workshop.onrender.com`.

Enter an existing `users.uuid` in the Student UUID field and save it. The
selection is saved in this browser and used as `student_id` when registering
or fetching My Registrations. No authentication is required.

Events use `event_id`, `title`, and `capacity`; registrations use `id`,
`student_id`, `event_id`, and `created_at`. The attendee list and its CSV export
show the data returned by the API. Dates, venues, check-ins, cancellation,
waitlists, and QR badges are not provided by these endpoints.

Redeploy the backend changes before using a separately hosted frontend: the
backend now handles CORS, including JSON POST preflight requests.
