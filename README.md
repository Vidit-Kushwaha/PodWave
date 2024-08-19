

# PodWave
Podwave is an innovative podcast platform that offers seamless podcast creation, playback, and sharing experiences. It allows users to generate and manage podcasts with ease, featuring customizable playback controls, transcript synchronization, and more.

![podwave page](https://i.ibb.co/QXPxg03/image.png)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Get Started](#get-started)
- [Contributing](#contributing)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)


## Technologies Used

- Genrative-AI
- OpenAI
- Google Text-To-Speech
- Google Cloud
- SSML
- NextJs
- Typescript

## Features 

- Blazing-fast performance with serverless functions
- Secure user authentication with iron-session
- Rich content creation with Markdown

##  Get Started

To run this portfolio website locally, follow these steps:

1. Clone the repository:

	```bash
	git clone https://github.com/Vidit-Kushwaha/PodWave.git
 	```

3. Install the dependencies:

	```bash
	npm install
 	```
 
4. Set environment variables:

	Create a .env file in the backend directory and add the following environment variables:
	```bash
    URL = "http://localhost:3000"
    OPENAI_API_KEYS = ""
    MAX_POADCAST_LIMIT_PER_DAY = 5
    KV_URL = ""
    KV_REST_API_URL = ""
    KV_REST_API_TOKEN=""
    KV_REST_API_READ_ONLY_TOKEN=""
    BUCKET_NAME = ""
    GOOGLE_PROJECT_ID = ""
    GOOGLE_CLIENT_EMAIL = ""
    GOOGLE_PRIVATE_KEY = ""
	```


6. Start the development server:

	```bash
	npm run dev
	```

7. Open your web browser and visit [http://localhost:3000](http://localhost:3000) to view the website.

## Contributing

We welcome contributions! Whether you're a seasoned developer or a curious enthusiast, there are ways to get involved:

-   **Bug fixes and improvements:** Find any issues? Submit a pull request!
-   **New features:** Have an idea for a cool feature? Let's discuss it in an issue!
-   **Documentation:** Improve the project's documentation and website.
-   **Spread the word:** Share the project with your network and help it grow!

## Contribution Guidelines

-   Please follow standard JavaScript and Next.js coding style.
-   Create separate pull requests for each feature or bug fix.
-   Write clear and concise commits.
-   Add documentation for any new features you contribute.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Vidit-Kushwaha/PodWave/blob/main/LICENSE) file for details.
