import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const routes = {
  "/": "index.html",
  "/index.html": "index.html",
  "/about": "about.html",
  "/about.html": "about.html",
  "/contact": "contact.html",
  "/contact.html": "contact.html",
  "/site-controls.js": "site-controls.js",
};

const files = {};

for (const [route, file] of Object.entries(routes)) {
  files[route] = await readFile(path.join(root, file), "utf8");
}

const worker = `const files = ${JSON.stringify(files, null, 2)};

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

function contentType(route) {
  if (route === "/" || route.endsWith(".html")) {
    return contentTypes[".html"];
  }

  return contentTypes[pathnameExtension(route)] || "text/plain; charset=utf-8";
}

function pathnameExtension(route) {
  const slash = route.lastIndexOf("/");
  const dot = route.lastIndexOf(".");
  return dot > slash ? route.slice(dot) : "";
}

function responseFor(route) {
  const body = files[route];

  if (!body) {
    return null;
  }

  return new Response(body, {
    headers: {
      "content-type": contentType(route),
      "cache-control": route.endsWith(".html") || route === "/" ? "no-cache" : "public, max-age=3600",
    },
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    let route = url.pathname;

    if (route.endsWith("/") && route !== "/") {
      route = route.slice(0, -1);
    }

    return responseFor(route) || responseFor("/") || new Response("Not found", { status: 404 });
  },
};
`;

await mkdir(path.join(root, "dist", "server"), { recursive: true });
await writeFile(path.join(root, "dist", "server", "index.js"), worker);
