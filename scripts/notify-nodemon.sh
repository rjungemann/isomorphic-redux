function check() {
  curl -sL -w "%{http_code}\\n" http://localhost:5000/api/v1/ping -o /dev/null
}

echo 'Waiting for server to restart before reloading...'

sleep 1
while [ `check` -ne '200' ]; do
  sleep 0.25
done

echo 'Server is started. Reloading...'

curl http://localhost:35729/changed?files=bundle.js >/dev/null 2>&1
