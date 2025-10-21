#!/bin/bash
cd /tmp/kavia/workspace/code-generation/simple-todo-list-668488-668497/todo_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

