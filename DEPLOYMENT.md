**Note:** This is just a personal reminder for deployment process to GitHub pages so I don't forget lol.

## Steps

Add `"homepage"` back to `package.json` (omitting this during development because it breaks filepaths and I don't feel like trying to troubleshoot that right now):

```json
  "homepage": "https://connordelacruz.github.io/react-p5-channel-shift",
```

Then run the following command to deploy it to GitHub pages with a commit message:

```
$ npm run deploy -- -m "<MESSAGE HERE>"
```

Wait patiently for load balancers to update, then you should be all set.
