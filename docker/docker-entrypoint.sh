#!/bin/bash

envsubst < /app/settings.json.template > /app/settings.json
rm -f /app/settings.json.template

exec nginx -g 'daemon off;'