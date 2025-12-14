#!/bin/bash
cd /home/kavia/workspace/code-generation/intelliassist-296705-296718/ai_assistant_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

