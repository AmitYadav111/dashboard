# Amit Yadav Dashboard

Live demo: https://dashboard-mu-roan-15.vercel.app/

Theme

- You can change the active theme by appending a query parameter to the app URL. Examples:

  - Local development: `http://localhost:3000/?theme=clientA` or `http://localhost:3000/?theme=clientB`
  - Production: `https://dashboard-mu-roan-15.vercel.app/?theme=clientA`

  Supported values: `clientA`, `clientB`. This switches the client-specific theme CSS loaded by the app.

A lightweight React dashboard showing client metrics and performance charts.

Quick start

- Install dependencies:

```bash
npm install
```

- Run in development:

```bash
npm start
```

- Build for production:

```bash
npm run build
```

Notes

- The app was bootstrapped with Create React App. The repository includes a production-ready `build/` folder.
- If you want to deploy or customize the build pipeline, update the scripts in `package.json`.

Contributing

Feel free to open issues or PRs. For quick changes, run the app locally and verify before submitting.

License

This project does not include a license file. Add one if you plan to publish the code.
