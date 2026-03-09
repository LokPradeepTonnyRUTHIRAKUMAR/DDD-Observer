import { createProject } from "./domain/product/factories.ts";
import { subscribe, deployProject } from "./domain/product/product.ts";
import { loggerObserver } from "./infrastructure/observers/observer.ts";
import { emailObserver } from "./infrastructure/observers/email.ts";
import { portfolioObserver } from "./infrastructure/observers/database.ts";

try {
  let project = createProject("Yann", "yan@mail.com", 1000, true);

  project = subscribe(project, loggerObserver);
  project = subscribe(project, emailObserver);
  project = subscribe(project, portfolioObserver);

  project = {
    ...project,
    status: "Build",
  };

  project = deployProject(project);

  console.log("Final project status:", project.status);
} catch (error) {
  console.error("Error:", error.message);
}
