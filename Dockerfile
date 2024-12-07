# Dockerfile
FROM node:   # Change this to your desired Node.js version (e.g., 14, 16, 18, latest)
WORKDIR /app
ENV PORT 8080
EXPOSE 8080
COPY . .
RUN npm install
# Change this URL bellow with your model URL
ENV MODEL_URL        
CMD [ "npm", "run", "start"]