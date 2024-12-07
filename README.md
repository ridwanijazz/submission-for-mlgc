# Submission MLGC ARF-36

Welcome to the **Submission MLGC ARF-36** repository. Follow the instructions below to set up and deploy this project.

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Arf-7447/submission-mlgc-arf-36.git
cd submission-mlgc-arf-36
```

### 2. Install Dependencies
Ensure you are using **Linux** or **WSL** for the following steps.

Run the command below to update your system and install the required dependencies:
```bash
sudo apt-get update && \
sudo apt-get install -y python3 build-essential && \
npm install && \
sudo apt-get clean && \
sudo rm -rf /var/lib/apt/lists/*
```

### 3. Configure Environment Variables
Set up your `.env` file according to your project requirements. Example:
```env
PORT= #defines the port
MODEL_URL= #defines the model bucket url. example https://storage.googleapis.com/your_bucket/your_folder/model.json
PROJECT_ID= #defines the project_id example your_project_id
GOOGLE_APPLICATION_CREDENTIALS=./service-account-key.json #defines the service account key, and add the file on the root
```
### 3. Configure Environment Variables (Dockerfile)
Set up your `Dockerfile` file according to your project requirements. Example:
```Dockerfile
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
```

### 4. Deploy
After completing the setup, proceed with deployment as per your deployment guidelines.
```Set up your :
    - Firestore (Native)
    - Cloud Storage (For upload your machine learning model)
    - Deploy using cloud run :
        | gcloud builds submit -t asia-southeast2-docker.pkg.dev/project-id/artifact-registry-repo/backend:latest .
        | gcloud run deploy --image=asia-southeast2-docker.pkg.dev/project-id/artifact-registry-repo/backend:latest --region=asia-southeast2
```
---

## 🛠 Prerequisites
- **Linux/WSL**: Required for compatibility.
- **Python 3**: For backend services.
- **Node.js**: To manage JavaScript dependencies.

---

## 📂 Repository Structure
```
submission-mlgc-arf-36/
src
├── errors
│   ├── ClientError.js
│   └── InputError.js
├── server
│   ├── controller.js
│   ├── routes.js
│   └── server.js
├── services
│   ├── dataService.js
│   ├── loadModel.js
│   └── predictionService.js
.env.example
.gitignore
Dockerfile
package.json
README.md
```

---

## ✨ Contributing
Contributions are welcome! Feel free to open a pull request or report issues.

---
