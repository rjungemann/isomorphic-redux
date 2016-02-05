function check() {
  curl localhost:5000/api/v1/ping >/dev/null 2>&1
}

check
while [ $? -ne 0 ]; do
  echo 'Waiting for server to restart before reloading...'
  sleep 1
  check
done

echo 'Server is started. Reloading...'

curl http://localhost:35729/changed?files=bundle.js >/dev/null 2>&1
