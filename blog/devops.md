---
title: DevOps Talk
description: A summary of key DevOps concepts and hands-on skills learned this year, including version control, containerization, Docker Compose, CI/CD, cloud services, and Linux fundamentals.
author: Mason Olson
published: 2026-02-24
category: DevOps
image: "/images/devops-workflow.png"
readTime: 7 min read
---

# DevOps Talk: Key Concepts and Hands-On Skills

    In this post, I summarize the key DevOps concepts and hands-on skills I learned this year in my Web & Software Developer course. DevOps is all about bridging the gap between development and operations, ensuring fast, reliable, and maintainable software delivery.

---

## Version Control

Version control is fundamental for collaboration and project management. Using Git, we learned how to:

- Track code changes with commits
- Branching and merging for feature development
- Pushing and pulling code from remote repositories (GitHub)

Example Git workflow:

```bash
# Clone a repository
git clone https://github.com/username/project.git

# Create a feature branch
git checkout -b feature/new-feature

# Add changes
git add .

# Commit changes
git commit -m "Add new feature"

# Push branch to remote
git push origin feature/new-feature

```

## Containerization

    Containerization allows applications to run consistently across environments using Docker. Each app runs in its own container with its dependencies isolated.

# Dockerfile
```bash
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

## Webserver and Database Fundamentals

We explored:

- Hosting web applications using Nginx
- Connecting web apps to databases like MySQL or PostgreSQL
- Basic CRUD operations from web apps

```bash
Example

docker run --name mydb -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres

```

## Used Docker Compose

    Docker Compose lets us manage multi-container applications with a single YAML file.

```YAML

version: "3"
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: secret


```

```bash
docker-compose up

```
## CI/CD
    We implemented CI/CD pipelines to automate testing and deployment:

- Automated testing with Node.js scripts
- GitHub Actions to trigger builds on push
- Deploying applications automatically to servers or cloud environments

Example GitHub Actions workflow:

```YAML
    name: Node.js CI

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: npm test

```
## CloudWork With AWS
We learned how to integrate cloud services:

- Store static assets in AWS S3 buckets
- Manage permissions and public access
- Deploy applications to cloud-hosted environments
```Bash
aws s3 sync ./public s3://my-website-bucket --acl public-read
```
## Basic Linux Fundamentals
- Navigating directories (cd, ls)
- Managing files (cp, mv, rm)
- Monitoring processes (top, ps)
- Installing packages (apt, yum)
```bash
sudo apt update
sudo apt upgrade -y
df -h
```