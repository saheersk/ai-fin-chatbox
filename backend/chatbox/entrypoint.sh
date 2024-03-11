#!/bin/bash

# Start the Django application
gunicorn -c chatbox/gunicorn_config.py chatbox.wsgi:application
