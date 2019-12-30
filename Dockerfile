FROM nginx
COPY docker/default.conf /etc/nginx/conf.d/
COPY dist/ /app/
COPY docker/docker-entrypoint.sh /docker-entrypoint.sh
COPY docker/settings.json.template /app/settings.json.template
ENTRYPOINT ["/docker-entrypoint.sh"]
