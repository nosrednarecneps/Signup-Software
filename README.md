# Signup-Software Documentation

## Introduction

REST API code for secure login, signup, verification, and basic account changes

## Prerequisites

Before getting started, make sure you have the following installed on your machine:

 - [Git](https://git-scm.com/)
 - [Node.js](https://nodejs.org/en) (which includes npm)

## Cloning the Repository

### 1. Navigate to the Project Directory

Open your terminal and naviate to the directory where you want to colone the repository.

```bash
cd your-project
```

### 2. Clone the Repository:

Change into the project directory:

```bash
git clone https://github.com/nosrednarecneps/Signup-Software.git
```

## Installing Dependencies

This project uses npm (Node Package Manager) to manage dependencies. The `package.json` file ensures consistent dependency versions across different installations (this project also supports the use of `package-lock.json`.

### 1. Review `package.json`

If you already have an established project and already have a `package.json` file, be sure to copy and paste all packages under the `"dependencies"` section from THIS project. Be sure to delete any duplicate `package.json` files to mantain a clean project folder.

### 2. Install Dependencies

Run the following command to install the dependencies specified in the `package.json` file:

```bash
npm install
```

This command reads the `"dependencies"` section of `package.json` and installs the specified packages.

### 3. Verify Installation

After the installation process completes, you should see a new folder named `node_modules` in your project directory. This folder contains the installed dependencies.

## Updating Dependencies

If you need to add or remove dependencies, update the `"dependencies"` section in `package.json` manually, or use the fllowing commands:

 - To add a new dependency:

```bash
npm install --save dependency-name
```

 - To remove a dependency:

```
npm uninstall --save dependency-name
```

### 1. Save Changes:

After modifying `package.json`, remember to save the changes.

### 2. Version Control

If you're using version control (e.g., Git), make sure to commit and push your changes.

## Seting up environment variables

Environment variables are used to store sensitive information. Environment variables are configuration values that are external to your application and can be modified without changing your code.

### Available Environment Variables

#### 1. `EMAIL`

 - **Description:** This environment variable is used to store the email address associated with the application.
 - **Example:**
```bash
EMAIL="example@example.com"
```

#### 2. `PASSWORD`

 - **Description:** This environment variable is used to store the password associated with your email (be sure to set up an [App Password](https://support.google.com/accounts/answer/185833?hl=en))
 - **Example:**
```bash
PASSWORD="examplePassword"
```

#### 3. `DATABASE_URL`

 - **Description:** This variable is used to specify the connection URL for the database used by the application
 - **Example:**
```bash
DATABASE_URL="mongodb://username:password@host:port/database"
```

#### 4. `HOSTNAME`

 - **Description:** This variable represents the host or domain name associated with the application
 - **Example:**
```bash
HOSTNAME=HOSTNAME="http://localhost/3000"
```

#### 5. `SENDMAIL`

 - **Description:** This variable is meant to set whether the application can send emails or not. Treat it as if it was a boolean value.
 - **Example:**
```bash
SENDMAIL="true"
```

### Setting Environment Variables

#### 1. Locally:

 - If you're running the application locally, you can set environment variables in your terminal or in a `.env` file.

#### 2. In Production:

 - For a production environment, set environment variables using the hosting platform's interface or configurations files.

### Note

 - **Security**: Treat environment variables containing sensitive information, such as passwords and API keys, with caution. Avoid hardcoding them in your code and ensure they are kept confidential.
 - **Configuration**: Refer to your application's documentation or codebase to understand how these environment variables are utilized within your specific project.

## Conclusion

You have successfully set up your project! Feel free to reach out if you encounter any issues or have further questions.
