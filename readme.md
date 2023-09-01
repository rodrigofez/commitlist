<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="/apps/frontend/src/assets/logo.svg" alt="Logo" width="80" height="80">
  <h3 align="center">CommitList Project</h3>

  <p align="center">
    An app to review github commit history for a repo
    <br />
    <br />
    <a href="https://commitlist.rodrigolopez.dev/">View Live Demo</a>
    ·
    <a href="https://commitlist.rodrigolopez.dev/api/v1/docs">View API docs</a>
  </p>
</div>

<!-- readme-top -->

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#infrastructure">Infrastructure</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Product Screen Shot][product-screenshot]

This web application utilizes the GitHub API to showcase information regarding commits within this repository. The application includes the capability to view the info of every commit by branch, it lets you see an interactive representation of all branches, and it's also possible to change the default repository to another one.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

The tech stack used for this application is Typescript as the language, Node with NestJS framework as the backend and ReactJS for the frontend. The infrastructure is deployed to AWS and the provisioning of it is automated with terraform. The deployment is automated with the help of Github Actions to upload the Docker Image to the correspondent Elastic Container Registry.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[product-screenshot]: /images/preview.gif
[aws-cloud]: /images/aws-cloud.png
[aws-shield]: https://img.shields.io/badge/aws-000?style=for-the-badge&logo=amazonaws&logoColor=white
[aws-url]: https://aws.amazon.com/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Nest.js]: https://img.shields.io/badge/NESTJS-ea2845?style=for-the-badge&logo=nestjs&logoColor=white
[Nestjs]: https://nestjs.com/
[terraform]: https://img.shields.io/badge/terraform-7b42bc?style=for-the-badge&logo=terraform&logoColor=white
[terra]: https://www.terraform.io/
[github]: https://img.shields.io/badge/github%20actions-0769AD?style=for-the-badge&logo=github&logoColor=white
[gh]: https://www.github.com/
[typescript]: https://img.shields.io/badge/typescript-000000?style=for-the-badge&logo=typescript&logoColor=white
[types.cript]: https://www.terraform.io/
[docker]: https://img.shields.io/badge/Docker-003f8c?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[tailwind]: https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://www.tailwindcss.com/

- [![React][React.js]][React-url]
- [![NestJS][Nest.js]][Nestjs]
- [![tailwind][tailwind]][tailwind-url]
- [![Next][aws-shield]][aws-url]
- [![terra][terraform]][terra]
- [![types.cript][typescript]][types.cript]
- [![gh][github]][gh]
- [![Docker][docker]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

To run the project you need the following:

- `node` version greater or equal to `v18.00`

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/rodrigofez/commitlist.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run the project
   ```sh
   npm run dev
   ```
4. Once it's running you can access the frontend in `http://localhost:5173/` and the backend in `http://localhost:3000/api/v1`

#### Build

```bash
npm install
npm run build
npm run start
```

Once it's running you can access the app in `http://localhost:3000/` and the backend in `http://localhost:3000/api/v1`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

1. Fork the Project
2. Create your Feature Branch `git checkout -b feat/new-feature`
3. Commit your Changes `git commit -m 'feat: add new feature'`
4. Push to the Branch `git push origin feat/new-feature`
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Infraestructure -->

## Infrastructure

The application is deployed to AWS and provisioned with the help of terraform, some of the AWS services used are ECR, ECS with EC2, ALB and ASG.

![aws cloud infraestructure][aws-cloud]

<p align="right">(<a href="#readme-top">back to top</a>)</p>
