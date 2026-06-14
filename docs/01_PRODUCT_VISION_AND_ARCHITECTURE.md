# Syntave GenUI: Product Vision & High-Level Architecture

## 1. The Core Philosophy
You are building **Syntave GenUI**, a production-ready Generative UI framework. Your execution must strictly embody Syntave's core values:
*   **Synthesis over Complexity:** Abstract away boilerplate. The LLM never writes JSX; the developer never writes complex mapping logic. JSON is the universal translator.
*   **Developer-First, Enterprise-Ready:** Developers get the joy of `npx add`, but enterprises get the security of auditable, locally-owned `.tsx` code.
*   **Relentless Quality:** Strict typing, zero bloat, graceful edge-case handling. Edge cases are documented and handled, not ignored.

## 2. The Problem We Solve
If an LLM generates UI data itself, it **hallucinates** (unacceptable for enterprise). If the LLM writes raw SQL or API calls, it's a **massive security risk** (unacceptable for production). GenUI solves this by separating *intent* (LLM) from *execution* (Backend) and *presentation* (Frontend).

## 3. The URL & Namespace Structure
We utilize a clean, memorable namespace at **`https://genui.syntave.com`**, divided into three distinct purposes:
1.  **`/r/` (The Registry API):** Serves raw JSON files that the CLI reads to download components (e.g., `/r/metric-card.json`). Follows the shadcn registry model.
2.  **`/docs/` (The Documentation):** Visual examples, installation guides, and LLM prompt engineering guides.
3.  **`/playground/` (The Testing Ground):** Interactive UI where developers paste JSON payloads and see rendered components instantly.

## 4. High-Level Data Flow
1.  **User Prompt:** User asks a question in the chat interface.
2.  **LLM Intent:** The LLM outputs a strictly typed JSON payload (e.g., `{ type: "MetricCard", props: { dataSource: "get_revenue" } }`). *Notice: No actual data is generated.*
3.  **Backend Interception:** The Syntave Data Resolver intercepts the JSON, validates it against Zod, and fetches *real* data from a secure, developer-defined allowlist.
4.  **Frontend Rendering:** The fully resolved, safe JSON is passed to the `<GenerativeUI />` runtime component, which maps it to the locally installed React component.
