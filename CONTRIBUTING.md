# 🤝 Contributing to SkillSphere

Thank you for your interest in contributing to **SkillSphere**! We appreciate your willingness to help enhance our platform. Whether you're fixing a bug, adding a feature, or improving documentation, your contributions are welcome.

To ensure a smooth collaboration, please follow these guidelines.

## 📜 Code of Conduct

We are committed to fostering a positive, inclusive, and professional environment. All contributors are expected to follow our **Code of Conduct**.

* **Be Respectful:** Always maintain a professional and respectful tone in all communications.
* **Be Empathetic:** Polite and empathetic interactions make collaboration productive and enjoyable.
* **Be Open to Feedback:** Constructive criticism is a part of the development process. Be open to feedback on your contributions and ready to make adjustments as needed.

(We recommend linking to a full `CODE_OF_CONDUCT.md` file here).

---

## 🚀 Getting Started: Your First Contribution

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or newer)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* Familiarity with [Git](https://git-scm.com/)

### Local Development Setup

1.  **Fork the Repository:** Click the "Fork" button at the top right of the [SkillSphere repository](https://github.com/Shashwath-K/SkillSphere-CAT) page.
2.  **Clone Your Fork:**
    ```bash
    git clone [https://github.com/YOUR_USERNAME/skillsphere-cat.git](https://github.com/YOUR_USERNAME/skillsphere-cat.git)
    cd skillsphere-cat
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
4.  **Run the Development Server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

---

## Workflow: How to Contribute Code

1.  **Find or Create an Issue**
    * Look through the [existing issues](https://github.com/Shashwath-K/SkillSphere-CAT/issues) to see if your bug or feature is already being discussed.
    * If you find one, please comment on the issue to express your interest before you start working. This prevents duplicate efforts.
    * If you don't find one, please [create a new issue](https://github.com/Shashwath-K/SkillSphere-CAT/issues/new) detailing your suggestion or problem.

2.  **Create a New Branch**
    * Make sure you are on the `main` branch and have the latest changes:
        ```bash
        git checkout main
        git pull origin main
        ```
    * Create a descriptive new branch for your feature or fix:
        ```bash
        # For a new feature
        git checkout -b feat/my-new-feature

        # For a bug fix
        git checkout -b fix/button-alignment
        ```

3.  **Make Your Changes**
    * Write your code!
    * Adhere to the coding standards and style guides used in the project.
    * Ensure your code is formatted correctly (we recommend using a tool like Prettier).

4.  **Test Your Changes**
    * Before committing, thoroughly test your changes to ensure they work as expected and do not introduce new issues.
    * If applicable, add or update unit tests for any new functionality.

5.  **Commit Your Changes**
    * Write clear and meaningful commit messages. We follow the **Conventional Commits** standard.
    * **Format:** `type(scope): subject`
    * **Examples:**
        * `feat(auth): add user registration form`
        * `fix(nav): correct mobile menu overlap`
        * `docs(readme): update setup instructions`
        * `style(home): adjust hero section padding`
        * `refactor(api): simplify course fetching logic`

6.  **Push and Open a Pull Request (PR)**
    * Push your branch to your fork:
        ```bash
        git push -u origin feat/my-new-feature
        ```
    * Go to the main SkillSphere repository and you will see a prompt to open a new Pull Request.
    * In your PR description, link to the issue it resolves (e.g., `Closes #123`).
    * Keep PRs focused on a single change. This makes them much easier and faster to review.

---

## Community

### 🔄 Stay Updated
* Keep track of ongoing discussions and updates in the project.
* Regularly check the main repository for new issues, pull requests, and changes.

### 📬 Contact
* If you have any questions or need clarification, feel free to ask in the relevant issue or start a [new Discussion](https://github.com/Shashwath-K/SkillSphere-CAT/discussions).

### 🎉 Have Fun!
* Enjoy the process of contributing to **SkillSphere**! Your efforts make a real difference in building a vibrant and useful platform.

---

Thank you for being a part of the **SkillSphere** community! Together, we can create something amazing.
